import LevelDebug from "./screens/LevelDebug";
import {shape_create} from "./utils/shape.js";
import "./EnQIne.css";

var shape = shape_create;

function level() {
  console.log("to aqui");
  let board = [
    [
      shape(1, 0, [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]),
      shape(2, 0, [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]),
      shape(0, 2, [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]),
    ],
    [
      shape(2, 1, [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]),
      shape(2, 0, [2,2,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]),
      shape(2, 0, [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]),
    ],
    [
      shape(0, 0, [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]),
      shape(0, 2, [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]),
      shape(0, 0, [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]),
    ],
  ];
  return board;
}

export default function Debug() {
  return (
    <main className="enqine-app">
      <LevelDebug levelBuilder={level} />
    </main>
  );
}
