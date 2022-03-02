import { mod_sum } from "./math";
import { random } from "./random";

// rotate a pos in array
// rotate_pos([0,2,0], 1, 1) === [0,0,2]
// rotate_pos([0,2,0], 1, 2) === [2,0,0]
// rotate_pos([1,2,0], 1, 2) === [2,0,0]
export function rotate_pos([...arr], pos, by) {
  const len = arr.length;
  if (pos < len) {
    const new_pos = mod_sum(pos, by, len);
    arr[new_pos] = arr[pos];
    arr[pos] = 0;
    return arr;
  } else {
    return arr;
  }
}

// rotate all the array
// rotate_global([0,2,0], 1) === [0,0,2]
// rotate_global([0,2,0], 2) === [2,0,0]
// rotate_global([1,2,0], 2) === [2,0,1]
export function rotate_global(arr, by) {
  const len = arr.length;
  let new_arr = [...arr];
  for (let i = 0; i < len; i++) {
    const new_pos = mod_sum(i, by, len);
    new_arr[new_pos] = arr[i];
  }
  return new_arr;
}

// transpose a matrix
export function transpose(matrix) {
  return matrix[0].map((_, c) => matrix.map((_, r) => matrix[r][c]));
}

// shuffles an array
export function shuffle([...arr]) {
  return random.shuffle(arr);
}

// apply a binary operation to each item of two arrays
export function combine([...a], [...b], op) {
  return Array.from({length: a.length}, (_, i) => op(a[i], b[i]));
};

export function array_equal(a, b) {
  return a.length === b.length &&
         a.every((val, index) => val === b[index]);
}