import { clearup } from "@testing-library/react";
import { useState, useEffect } from "react";
import { compose } from "../../utils";
import { clearDraw, draw } from "./draw";
import { hvmDebugPreParser, hvmDebugParser } from "./parser.ts";
import "./Visualizer.css";

export default function HVMVisualizer({}) {
  const [debugCode, setDebugCode] = useState("");
  const [nodes, setNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(1);

  useEffect(() => {
    if (debugCode) {
      setNodes(hvmDebugPreParser(debugCode));
    }
  }, [debugCode]);

  useEffect(() => {
    if (debugCode) {
      compose(draw, hvmDebugParser)(nodes[selectedNode - 1]);
    }
  }, [selectedNode, nodes]);

  useEffect(() => {
    scrollToNodeText();
  }, [selectedNode]);

  useEffect(() => {
    window.onkeydown = (e) => {
      if (e.key === "ArrowRight") controlSelectedNode((a) => a + 1);
      if (e.key === "ArrowLeft") controlSelectedNode((a) => a - 1);
    };
  }, []);

  return (
    <main>
      <section className="hvm-debug--text-container">
        <TextContainer />
      </section>
      <section className="hvm-debug--tree-container">
        <div className="hvm-debug--pagination">
          <Pagination
            selectedNode={selectedNode}
            maxNodes={nodes.length}
            whenBack={() => {
              controlSelectedNode((a) => a - 1);
            }}
            whenAdvance={() => {
              controlSelectedNode((a) => a + 1);
            }}
          />
        </div>
        <div className="hvm-debug">
          <div id="hvm-debug--html"></div>
          <svg id="hvm-debug--svg"></svg>
        </div>
      </section>
    </main>
  );

  function controlSelectedNode(operation) {
    if (debugCode) {
      const newSelectedNode = operation(selectedNode);
      if (newSelectedNode >= 1 && newSelectedNode <= nodes.length) {
        setSelectedNode(newSelectedNode);
      }
    }
  }

  function scrollToNodeText() {
    if (nodes.length > 0) {
      const element = document.querySelector(
        `#hvm-debug--text-wrapper-${selectedNode}`
      );
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }

  function clear() {
    setDebugCode("");
    setNodes([]);
    setSelectedNode(1);
    clearDraw();
  }

  function TextContainer() {
    if (nodes.length > 0)
      return (
        <NodesText
          selectedNode={selectedNode}
          nodes={nodes}
          whenClick={(i) => {
            setSelectedNode(i);
          }}
          whenClear={() => clear()}
        />
      );
    else
      return (
        <TextArea
          whenChange={(value) => {
            setDebugCode(value);
          }}
        />
      );
  }
}

function NodesText({ nodes, selectedNode, whenClick, whenClear }) {
  return (
    <>
      {nodes.map((node, i) => (
        <div
          key={i}
          className="hvm-debug--text-wrapper"
          id={`hvm-debug--text-wrapper-${i}`}
          style={{
            borderColor: selectedNode - 1 === i ? "orange" : "black",
          }}
          onClick={() => whenClick(i + 1)}
        >
          {node}
        </div>
      ))}
      <button
        className="hvm-debug--clear-button"
        onClick={() => {
          whenClear();
        }}
      >
        Limpar
      </button>
    </>
  );
}

function TextArea({ whenChange }) {
  return (
    <textarea
      draggable="false"
      wrap="false"
      placeholder="Paste your debug here..."
      onChange={(e) => whenChange(e.target.value)}
    ></textarea>
  );
}

function Pagination({ selectedNode, maxNodes, whenAdvance, whenBack }) {
  return (
    <>
      {maxNodes > 0 && (
        <>
          <button
            onClick={() => {
              whenBack();
            }}
          >
            {"<"}
          </button>
          <span>
            {selectedNode} / {maxNodes}
          </span>
          <button
            onClick={() => {
              whenAdvance();
            }}
          >
            {">"}
          </button>
        </>
      )}
    </>
  );
}
