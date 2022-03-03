import { shape_empty, Shape } from './shape.js';
import { random } from './random';
import { mod_sum } from './math';

// create an empty board
export function board_create_empty() {
  return [
    [
      shape_empty(),
      shape_empty(),
      shape_empty()
    ],
    [
      shape_empty(),
      shape_empty(),
      shape_empty()
    ],
    [
      shape_empty(),
      shape_empty(),
      shape_empty()
    ]
  ]
}

// apply shape to all of the board
export function board_create_with(shape) {
  return [
    [
      shape,
      shape,
      shape,
    ],
    [
      shape,
      shape,
      shape,
    ],
    [
      shape,
      shape,
      shape,
    ],
  ]
}

// BOARD MODIFICATIONS

// add an value attr to all board's shapes
export function board_mod_attr(attr, value, board) {
  return board.map(row => row.map(shape => ({...shape, [attr]: value})))
}

// receive an attr and an array with length = 3 of values
// apply each value in each row 
export function board_mod_row_attr(attr, values, board) {
  return board.map(
    (row, i) => row.map(
      shape => ({...shape, [attr]: values[i]})
    )
  )
}

// receive an attr and a matrix of values
// if column_flow is false:
//   apply each value in each shape of the board
//   following the order
//   1 2 3
//   4 5 6
//   7 8 9
// else:
//   apply each value in each shape of the board
//   following the order
//   1 4 7
//   2 5 8
//   3 6 9
export function board_mod_each_attr(attr, values, [...board], column_flow = false) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      let row = column_flow ? j : i;
      let col = column_flow ? i : j;
      board[row][col] = {...board[row][col], [attr]: values[i][j]};
    }
  }

  return board;
}

// puts an order in each row of the board
// order(border, [1,2,3], board.empty())
// 2 3 1
// 3 1 2
// 1 2 3
export function board_order(attr, items, board) {
  // shuffle positioning
  let pos = [0,1,2];
  random.shuffle(pos);

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j] = {...board[i][j], [attr]: items[mod_sum(pos[i], j, 3)]};
    }
  }

  return board;
}