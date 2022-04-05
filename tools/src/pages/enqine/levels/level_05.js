import { combine, rotate_global, transpose, shuffle } from "../utils/array";
import { shape_create } from "../utils/shape";
import { board_create_with, board_mod_each_attr } from "../utils/board";

export default function() {
  // wheels base array
  // used to garantee that exactly 
  // 3 wheels will appear
  const wheel_base = [1,0,0,0,1,0,1,0];

  // generate the first column's wheels 
  // all of them are variation of `wheel_base` array
  const first_column_wheel = [
    shuffle(wheel_base),
    shuffle(wheel_base),
    shuffle(wheel_base)
  ];

  // generate second column
  const second_column_wheel = [
    shuffle(wheel_base),
    shuffle(wheel_base),
    shuffle(wheel_base)
  ]

  // third column will be the combination of 
  // previous columns. the operation (third argument)
  // is a NOT XOR. Therefore the logic is:
  // a wheel will only appear in the third column if it
  // appears in this position in the two previous columns, or
  // if does not appear in this position in the two previous columns
  const third_column_wheel  = combine(first_column_wheel, second_column_wheel, (a, b) => a.map((i, idx) => b[idx] == i));

  // all three wheels columns
  const wheels = [
    first_column_wheel,
    second_column_wheel,
    third_column_wheel
  ];

  // create a board with a base shape (all empty circles)
  const base_shape = shape_create(2, 0, [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]);
  const base_board = board_create_with(base_shape);

  // populate the board with the previous wheels columns
  const board = board_mod_each_attr("wheel", wheels, base_board, true);
  // return board
  return board;
}