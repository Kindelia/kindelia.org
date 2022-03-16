import { useEffect, useState } from "react";
import roadmap from "./roadmap.json";
import RoadgraphItem from "./RoadgraphItem";
import drawRoadgraph from "./d3";

import "./Roadgraph.css";

export default function RoadGraph() {
  const [taskSelected, setTaskSelected] = useState(undefined);

  useEffect(() => {
    if (!taskSelected) {
      drawRoadgraph(roadmap, goToTask);
    }
  }, [taskSelected]);

  return (
    <>
      {taskSelected ? (
        <RoadgraphItem {...taskSelected} whenBack={whenBack} />
      ) : (
        <div className="roadgraph">
          <div id="data" className="node-wrapper"></div>
          <svg></svg>
        </div>
      )}
    </>
  );

  function goToTask(e, d) {
    setTaskSelected(d.data);
  }

  function whenBack() {
    setTaskSelected(undefined);
  }
}
