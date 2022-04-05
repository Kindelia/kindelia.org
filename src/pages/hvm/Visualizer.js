import { useState, useEffect } from "react";
import { compose } from "../../utils";
import { clearDraw, draw } from "./draw";
import { hvmDebugPreParser, hvmDebugParser } from "./parser.ts";

import "./Visualizer.css";

export default function HVMVisualizer() {
  // initial state of component
  const [debugCode, setDebugCode] = useState("");
  const [nodes, setNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(0);

  // every time `debugCode` changes:
  // divide text into 'nodes'
  useEffect(() => {
    if (debugCode) {
      setNodes(hvmDebugPreParser(debugCode));
    }
  }, [debugCode]);

  // every time `nodes` and `selectedNodes`changes:
  // draw the new `selectedNode` of `nodes`
  useEffect(() => {
    if (nodes.length > 0) {
      const drawTree = compose(draw, hvmDebugParser);
      drawTree(nodes[selectedNode]);
    }
  }, [selectedNode, nodes]);

  // every time `selectedNode `changes:
  // scroll to the selected node 
  useEffect(() => {
    scrollToNode();
  }, [selectedNode]);



  return (
    <main className="hvm-visualizer">
      <section className="left-container">
        <LeftContainer
          selectedNode={selectedNode}
          nodes={nodes}
          whenChange={setDebugCode}
          whenSelect={setSelectedNode}
          whenClear={clear}
        />
      </section>
      <section className="tree-container">
        <Pagination
          selected={selectedNode}
          max={nodes.length}
          whenBack={() => { selectNode((a) => a - 1) }}
          whenAdvance={() => { selectNode((a) => a + 1) }}
          whenSelect={v => selectNode(_ => v)}
          whenFastAdvance={() => { fastSelectNode(a => a + 1) }}
          whenFastBack={() => { fastSelectNode(a => a - 1) }}
        />
        <div className="hvm-tree">
          <div id="hvm-tree--html"></div>
          <svg id="hvm-tree--svg"></svg>
        </div>
      </section>
    </main>
  );

  function selectNode(operation) {
    if (nodes.length > 0) {
      const newSelectedNode = operation(selectedNode);
      if (isSelectedNodeValid(newSelectedNode, nodes)) {
        setSelectedNode(newSelectedNode);
      }
    }
  }

  function fastSelectNode(operation) {
    function removeDolar(code) {
      return code.replaceAll("$", "");
    }

    if (nodes.length > 0) {
      const actualNode = nodes[selectedNode];
      let newSelectedNode = operation(selectedNode);
      while (
        isSelectedNodeValid(newSelectedNode, nodes) &&
        removeDolar(actualNode) === removeDolar(nodes[newSelectedNode])
      )
        newSelectedNode = operation(newSelectedNode);
      
      setSelectedNode(
        Math.max(0, Math.min(newSelectedNode, nodes.length - 1))
      );
    }
  }

  function isSelectedNodeValid(selectedNode, nodes) {
    return selectedNode >= 0 && selectedNode <= nodes.length - 1;
  }

  function scrollToNode() {
    if (nodes.length > 0) {
      const element = document.querySelector(
        `#text-wrapper-${selectedNode}`
      );
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }

  // return everything to initial state
  function clear() {
    setDebugCode("");
    setNodes([]);
    setSelectedNode(0);
    clearDraw();
  }
}

// LEFT
// chooses what to draw in left
function LeftContainer({ selectedNode, nodes, whenSelect, whenClear, whenChange }) {
  if (nodes.length > 0)
    return (
      <NodeBlocks
        selectedNode={selectedNode}
        nodes={nodes}
        whenClick={(i) => { whenSelect(i) }}
        whenClear={whenClear}
      />
    );
  else
    return <TextArea whenChange={whenChange} />;
}

// draws each text block for each node
// also draws a clear button
function NodeBlocks({ nodes, selectedNode, whenClick, whenClear }) {
  return (
    <>
      {nodes.map((node, i) =>
        <div
          key={i}
          className="text-wrapper"
          id={`text-wrapper-${i}`}
          onClick={() => whenClick(i)}
          style={{
            borderColor: selectedNode === i ? "orange" : "black",
          }}
        > {node} </div>
      )}
      <button
        className="clear-button"
        onClick={() => { whenClear() }}
      > Clear </button>
    </>
  );
}

// draws the text area
function TextArea({ whenChange }) {
  return (
    <textarea
      placeholder="Paste your debug here..."
      onChange={(e) => whenChange(e.target.value)}
      draggable="false"
      wrap="false"
    ></textarea>
  );
}

// RIGHT
// draws the pagination component
function Pagination({ selected, max, whenAdvance, whenFastAdvance, whenBack, whenFastBack, whenSelect }) {
  return (
    // show if there is more than one to show
    max > 0 && (
      <div className="pagination">
        <button onClick={() => { whenFastBack() }}>{"<<"}</button>
        <button onClick={() => { whenBack() }}>{"<"}</button>
        <span>
          <input type="number" value={selected + 1} onChange={(e) => { whenSelect(Number(e.target.value - 1)) }} />
          /{max}
        </span>
        <button onClick={() => { whenAdvance() }}>{">"}</button>
        <button onClick={() => { whenFastAdvance() }}>{">>"}</button>
      </div>
    )
  );
}
