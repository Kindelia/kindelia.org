import {
  dagStratify,
  sugiyama,
  layeringLongestPath,
  coordQuad,
  decrossOpt,
} from "d3-dag";
import { select, line, curveCatmullRom, symbol, symbolTriangle } from "d3";

const nodeRadius = 40;

//functions to draw the roadgraph
export default function drawRoadgraph(data, goToTask) {
  // Generate dag and layout metadata (pos x and y for each node)
  const { dag, width, height } = genDagLayout(data);
  // Draw edge lines in SVG
  drawSVG(dag, width, height);
  // Draw node boxes in HTML
  drawHTML(dag, width, height, goToTask);
}

function genDagLayout(data) {
  // Generate dag from data
  const dag = dagStratify().parentIds(({ dependencies }) => dependencies)(data);
  // Generate a layout metadata from dag

  const layout = sugiyama()
    .layering(layeringLongestPath())
    .coord(coordQuad())
    .decross(decrossOpt())
    .nodeSize((node) => [(node ? 3.6 : 0.25) * nodeRadius, 3 * nodeRadius]);
  const { width, height } = layout(dag);

  return { dag, width, height };
}

// SVG
// ======
function drawSVG(dag, width, height) {
  // Get SVG wrapper
  const { svg, defs } = getSVG(width, height);
  // Draw edge lines
  drawEdges(svg, defs, dag);
}

function getSVG(width, height) {
  // Get SVG wrapper in html
  const svgSelection = select("svg");
  svgSelection
    .attr("viewBox", [0, 0, width, height].join(" "))
    .style("width", width + "px")
    .style("height", height + "px");
  const defs = svgSelection.append("defs"); // For gradients
  return { svg: svgSelection, defs };
}

function drawEdges(svg, defs, dag, node) {
  // How to draw edges
  const draw_line = line()
    .curve(curveCatmullRom)
    .x((d) => d.x)
    .y((d) => d.y);

  // Plot arrows
  const r = nodeRadius / 1.5;
  const arrowSize = (r * r) / 5.0;
  const arrowLen = Math.sqrt((4 * arrowSize) / Math.sqrt(3));
  const arrow = symbol().type(symbolTriangle).size(arrowSize);
  svg
    .append("g")
    .selectAll("path")
    .data(dag.links())
    .enter()
    .append("path")
    .attr("d", arrow)
    .attr("transform", ({ source, target, points }) => {
      const [end, start] = points.slice().reverse();
      // This sets the arrows the node radius (20) + a little bit (3) away from the node center, on the last line segment of the edge. This means that edges that only span ine level will work perfectly, but if the edge bends, this will be a little off.
      const dx = start.x - end.x;
      const dy = start.y - end.y;
      const proximity = 30;
      const scale = (proximity * 1.15) / Math.sqrt(dx * dx + dy * dy);
      // This is the angle of the last line segment
      const angle = (Math.atan2(-dy, -dx) * 180) / Math.PI + 90;
      return `translate(${end.x + dx * scale}, ${
        end.y + dy * scale
      }) rotate(${angle})`;
    })
    .attr("fill", "black")
    .attr("stroke", "white")
    .attr("stroke-width", 1.5)
    .attr("stroke-dasharray", `${arrowLen},${arrowLen}`);

  // Plot edges
  svg
    .append("g")
    .selectAll("path")
    .data(dag.links())
    .enter()
    .append("path")
    .attr("d", ({ points }) => draw_line(points))
    .attr("fill", "none")
    .attr("stroke-width", 3)
    .attr("stroke", ({ source, target }) => {
      // encodeURIComponents for spaces, hope id doesn't have a `--` in it
      const gradId = encodeURIComponent(`${source.data.id}--${target.data.id}`);
      const grad = defs
        .append("linearGradient")
        .attr("id", gradId)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", source.x)
        .attr("x2", target.x)
        .attr("y1", source.y)
        .attr("y2", target.y);
      grad.append("stop").attr("offset", "0%");
      grad.append("stop").attr("offset", "100%");
      return `url(#${gradId})`;
    });
}

//HTML
//=======
function drawHTML(dag, width, height, goToTask) {
  // get wrapper
  const div = getHTML(width, height);
  // draw node boxes
  drawNodes(div, dag, goToTask);
}

function getHTML(width, height) {
  // get HTML div wrapper for the node drawing
  const divSelection = select("#data");
  divSelection.style("width", width + "px").style("height", height + "px");
  return divSelection;
}

function drawNodes(div, dag, goToTask) {
  // Create a div node for each data in dag
  const nodes = div
    .selectAll("div")
    .data(dag.descendants())
    .enter()
    .append("div")
    .style("position", "absolute")
    .style("color", ({ data }) => (data.here ? "orange" : "black"))
    .style("transform", ({ x, y }) => `translate(${x}px, ${y}px)`)
    .style("cursor", "pointer");

  // draw a box for each node
  drawNodesBox(nodes, goToTask);
}

function drawNodesBox(nodes, goToTask) {
  // Box of a node
  const containers = nodes
    .append("div")
    .on("click", (e, d) => {
      goToTask(e, d);
    })
    .style("border-color", (d) =>
      d.data.workers.length > 0 ? "orange" : "black"
    )
    .attr("class", "node-container");

  // Add title to the box
  containers
    .append("p")
    .attr("class", "node-title")
    .text((d) => d.data.name);
  // Add date to the box
  containers
    .append("p")
    .attr("class", "node-date")
    .text((d) => d.data.date);
  // Add progress bar to the box
  containers
    .append("progress")
    .attr("max", "100")
    .attr("value", (d) => d.data.progress * 100);
}
