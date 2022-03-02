import { rotate_global, transpose, shuffle } from "../utils/array.js";
import { board_mod_each_attr, board_create_empty, board_mod_row_attr } from "../utils/board.js";
import { shape_create } from "../utils/shape.js";
 
 export default function() {
  const wheel_base = [1,0,2,0,0,0,0,3];
  const first_column_wheel = [
    shuffle(wheel_base),
    shuffle(wheel_base),
    shuffle(wheel_base)
  ];

  const second_column_wheel  = first_column_wheel.map(wheels => rotate_global(wheels, 5));
  const third_column_wheel  = second_column_wheel.map(wheels => rotate_global(wheels, 7));
  const wheels = transpose([
    first_column_wheel,
    second_column_wheel,
    third_column_wheel
  ]);

  let board = board_create_empty();
  board = board_mod_row_attr("border", shuffle([1,2,3]), board);
  board = board_mod_each_attr("wheel", wheels, board);
  return board;
 }