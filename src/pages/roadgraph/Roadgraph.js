import roadmap from "./roadmap.json";
import {
  dagStratify,
  sugiyama,
  layeringLongestPath,
  coordCenter,
  decrossOpt,
  decrossTwoLayer,
} from "d3-dag";
import { select, line, curveCatmullRom } from "d3";
import { useEffect, useState } from "react";

import "./Roadgraph.css";
import RoadgraphItem from "./RoadgraphItem";

export default function RoadGraph() {
  const [taskSelected, setTaskSelected] = useState(undefined);

  const goToTask = (e, d) => {
    setTaskSelected(d.data);
  };

  const whenBack = () => {
    setTaskSelected(undefined);
  };

  useEffect(() => {
    if (!taskSelected) {
      const dag = dagStratify().parentIds(({ dependencies }) => dependencies)(
        roadmap
      );
      const nodeRadius = 40;
      const layout = sugiyama()
        .layering(layeringLongestPath())
        .coord(coordCenter())
        .decross(decrossOpt())
        .nodeSize((node) => [(node ? 3.6 : 0.25) * nodeRadius, 3 * nodeRadius]);
      // .layering(); // set node size instead of constraining to fit
      const { width, height } = layout(dag);

      const svgSelection = select("svg");
      const divSelection = select("#data");
      divSelection.style("width", width + "px").style("height", height + "px");
      svgSelection
        .attr("viewBox", [0, 0, width, height].join(" "))
        .style("width", width + "px")
        .style("height", height + "px");
      const defs = svgSelection.append("defs"); // For gradients

      const steps = dag.size();

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
          grad.append("stop").attr("offset", "0%");
          grad.append("stop").attr("offset", "100%");
          return `url(#${gradId})`;
        });

      // Select nodes
      const nodes = divSelection
        .selectAll("div")
        .data(dag.descendants())
        .enter()
        .append("div")
        .style("position", "absolute")
        .style("transform", ({ x, y }) => `translate(${x}px, ${y}px)`)
        .style("cursor", "pointer");

      // Plot node circles
      const containers = nodes
        .append("div")
        .on("click", (e, d) => {
          goToTask(e, d);
        })
        .style("border-color", (d) =>
          d.data.workers.length > 0 ? "orange" : "black"
        )
        .attr("class", "node-container");

      containers
        .append("p")
        .attr("class", "node-title")
        .text((d) => d.data.name);
      containers
        .append("p")
        .attr("class", "node-date")
        .text((d) => d.data.date);
      containers
        .append("progress")
        .attr("max", "100")
        .attr("value", (d) => d.data.progress * 100);

      // // Add text to nodes
      // nodes
      //   .append("text")
      //   .text((d) => d.data.description)
      //   .attr("font-weight", "bold")
      //   .attr("font-family", "monospace")
      //   .attr("text-anchor", "middle")
      //   .attr("alignment-baseline", "middle")
      //   .attr("fill", "black");
    }
  }, [taskSelected]);

  return (
    <>
      {!taskSelected && (
        <div className="roadgraph">
          <div id="data" className="node-wrapper"></div>
          <svg></svg>
        </div>
      )}
      {taskSelected && <RoadgraphItem {...taskSelected} whenBack={whenBack} />}
    </>
    // <pre>
    //   <code>{JSON.stringify(dag, null, 2)}</code>
    // </pre>
  );
}
