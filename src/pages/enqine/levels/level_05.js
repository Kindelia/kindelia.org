import { combine, rotate_global, transpose, shuffle } from "../utils/array";
import { shape_create } from "../utils/shape";
import { board_create_with, board_mod_each_attr } from "../utils/board";

export default function() {
  const wheel_base = [1,0,0,0,1,0,1,0];
  const first_column_wheel = [
    shuffle(wheel_base),
    shuffle(wheel_base),
    shuffle(wheel_base)
  ];

  const second_column_wheel = [
    shuffle(wheel_base),
    shuffle(wheel_base),
    shuffle(wheel_base)
  ]

  const third_column_wheel  = combine(first_column_wheel, second_column_wheel, (a, b) => a.map((i, idx) => b[idx] == i));
  const wheels = transpose([
    first_column_wheel,
    second_column_wheel,
    third_column_wheel
  ]);

  const base_shape = shape_create(2, 0, [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]);
  const base_board = board_create_with(base_shape);
  const board = board_mod_each_attr("wheel", wheels, base_board);
  return board;
}