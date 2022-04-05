import { rotate_global, transpose, shuffle } from "../utils/array.js";
import { board_mod_each_attr, board_create_empty, board_mod_row_attr } from "../utils/board.js";
import { shape_create } from "../utils/shape.js";
 
 export default function() {
  // wheel base
  const wheel_base = [1,0,2,0,0,0,0,3];

  // first column is random generated
  // based in wheel_base
  const first_column_wheel = [
    shuffle(wheel_base),
    shuffle(wheel_base),
    shuffle(wheel_base)
  ];

  // second column is a global rotation of the first
  const second_column_wheel  = first_column_wheel.map(wheels => rotate_global(wheels, 5));

  // third column is a global rotation of the second
  const third_column_wheel  = second_column_wheel.map(wheels => rotate_global(wheels, 7));

  // the matrix of wheels
  const wheels = [
    first_column_wheel,
    second_column_wheel,
    third_column_wheel
  ];

  // create wmpty board
  let board = board_create_empty();
  // populate board with random borders.
  // each row will have the same border.
  board = board_mod_row_attr("border", shuffle([1,2,3]), board);
  // apply the wheels to the matrix
  board = board_mod_each_attr("wheel", wheels, board, true);
  return board;
 }