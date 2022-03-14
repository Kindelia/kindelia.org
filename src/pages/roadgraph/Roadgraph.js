import receita from "./receita.json";
import {
  dagStratify,
  sugiyama,
  layeringLongestPath,
  coordCenter,
  decrossOpt,
  decrossTwoLayer,
} from "d3-dag";
import { select, interpolateCool, line, curveCatmullRom } from "d3";
import { useEffect } from "react";

export default function RoadGraph() {
  useEffect(() => {
    const dag = dagStratify()(receita);
    const nodeRadius = 40;
    const layout = sugiyama()
      .layering(layeringLongestPath())
      .coord(coordCenter())
      .decross(decrossOpt())
      .nodeSize((node) => [(node ? 3.6 : 0.25) * nodeRadius, 3 * nodeRadius]);
    // .layering(); // set node size instead of constraining to fit
    const { width, height } = layout(dag);

    const svgSelection = select("svg");
    svgSelection.attr("viewBox", [0, 0, width, height].join(" "));
    const defs = svgSelection.append("defs"); // For gradients

    const steps = dag.size();
    const interp = interpolateCool;
    const colorMap = new Map();
    dag.descendants().forEach((node, i) => {
      colorMap.set(node.data.id, interp(i / steps));
    });

    // How to draw edges
    const draw_line = line()
      .curve(curveCatmullRom)
      .x((d) => d.x)
      .y((d) => d.y);

    // Plot edges
    svgSelection
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
        const gradId = encodeURIComponent(
          `${source.data.id}--${target.data.id}`
        );
        const grad = defs
          .append("linearGradient")
          .attr("id", gradId)
          .attr("gradientUnits", "userSpaceOnUse")
          .attr("x1", source.x)
          .attr("x2", target.x)
          .attr("y1", source.y)
          .attr("y2", target.y);
        grad
          .append("stop")
          .attr("offset", "0%")
          .attr("stop-color", colorMap.get(source.data.id));
        grad
          .append("stop")
          .attr("offset", "100%")
          .attr("stop-color", colorMap.get(target.data.id));
        return `url(#${gradId})`;
      });

    // Select nodes
    const nodes = svgSelection
      .append("g")
      .selectAll("g")
      .data(dag.descendants())
      .enter()
      .append("g")
      .attr("transform", ({ x, y }) => `translate(${x}, ${y})`)
      .style("cursor", "pointer");

    // Plot node circles
    nodes
      .append("rect")
      .style("width", (d) => d.data.description.length + 2 + "ch")
      .attr("rx", 10)
      .attr("ry", 10)
      .attr("height", nodeRadius)
      .attr("fill", (n) => colorMap.get(n.data.id))
      .style(
        "transform",
        (d) =>
          `translate(-${d.data.description.length / 2 + 1}ch, -${
            nodeRadius / 2
          }px)`
      );

    // Add text to nodes
    nodes
      .append("text")
      .text((d) => d.data.description)
      .attr("font-weight", "bold")
      .attr("font-family", "sans-serif")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("fill", "white");
  }, []);

  return (
    <svg></svg>
    // <pre>
    //   <code>{JSON.stringify(dag, null, 2)}</code>
    // </pre>
  );
}
