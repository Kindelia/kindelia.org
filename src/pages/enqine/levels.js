import LevelDebug from "./screens/LevelDebug";
import { shape_create, shape_empty } from "./utils/shape";var image_create = shape_create;
var image_empty = shape_empty;

function mod(a, b) {
  return (a % b + b) % b;
}

function get_bit(value, index) {
  return (value >>> index) & 1;
}

function set_bit(value, index) {
  return value | (1 << index);
}

function fork(xs, f) {
  var res = [];
  for (var x of xs.map(f)) {
    for (var y of x) {
      res.push(y);
    }
  }
  return res;
}

function permut(xs, res = []) {
  if (xs.length === 0) {
    return [res];
  } else {
    return fork(xs, x => permut(xs.filter(y => y !== x), res.concat([x])));
  }
}

function comb(xs, lim, max = -1, res = []) {
  if (xs.length === 0 || lim === 0) {
    return [res];
  } else {
    return fork(xs, x => {
      if (x > max) {
        return comb(xs.filter(y => y !== x), lim - 1, x, res.concat([x]));
      } else {
        return [];
      }
    });
  }
}

function has(xs, x) {
  return xs.indexOf(x) !== -1;
}

function wheel_xy(image, x, y, val) {
  var i;
  switch (x + "-" + y) {
    case "0-0": i = 5; break;
    case "0-1": i = 4; break;
    case "0-2": i = 3; break;
    case "1-0": i = 6; break;
    case "1-1": i = null; break;
    case "1-2": i = 2; break;
    case "2-0": i = 7; break;
    case "2-1": i = 0; break;
    case "2-2": i = 1; break;
  }
  if (i === null) {
    image.center = mod(val, 4);
  } else {
    image.wheel[i] = mod(val, 4);
  }
}

function border(image, val) {
  image.border = mod(val, 4);
}

function center(image, val) {
  image.center = mod(val, 4);
}

function wheel_ang(image, ang, val) {
  image.wheel[mod(ang, 8)] = val;
}

function clock_ang(image, ang, val) {
  image.clock[mod(ang, 8)] = val;
}

function next_seed(seed) {
  let m =	2147483629;
  let i = 2147483587;
  let q = Math.pow(2,31) - 1;
  return (seed * m + i) % q;
};

function get_value(value, index, base) {
  var num = value
  for(var i = 0; i < index; ++i){
    num = Math.floor(num / base)
  }
  return(mod(num, base));
}

var NONCE = 117;
var SEED = 1;
for (var i = 0; i < NONCE; ++i) {
  SEED = next_seed(SEED);
}

function random(seed, lim, avoid) {
  return [next_seed(seed), mod(seed, lim)];
};

export function get_seed() {
  return Math.floor(Math.random() * (2 ** 32));
}

function get_color(value, index) {
  var num = value
  for (var i = 0; i < index; ++i) {
    num = Math.floor(num / 4)
  }
  return (mod(num, 4));
}

function level(randoms, draw) {
  return function(init_seed) {
    if (!init_seed) {
      init_seed = get_seed(); 
    }
    var seed = init_seed;

    var rnds = [];
    var seen = {};
    for (var y = 0; y < 3; ++y) {
      var line_rnds = [];
      for (var n = 0; n < randoms.length; ++n) {
        for (var t = 0; t < 64; ++t) {
          var [seed, rnd] = random(seed, randoms[n]);
          if (seen[n+"-"+rnd] === undefined) {
            line_rnds.push(rnd);
            seen[n+"-"+rnd] = 1;
            break;
          }
        }
      }
      rnds.push(line_rnds);
    }

    var board = [];
    for (var y = 0; y < 3; ++y) {
      var line = [];
      for (var x = 0; x < 3; ++x) {
        var image = image_empty();
        draw(image, x, y, rnds[y]);
        line.push(image);
      }
      board.push(line);
    }
    return board;
  };
}
export const levels = {

  // MIS
  lv1: level([3], (image, x, y, r) => {
    border(image, 2);
  }),
  // OR
  lv2: level([8,7], (image, x, y, r) => {
    border(image, 2);
    if (x == 0 || x == 2) {
      wheel_ang(image, r[0], 1);
    }
    if (x == 1 || x == 2) {
      wheel_ang(image, r[0] + 1 + r[1], 1);
    }
  }),
  // ROT
  lv3: level([9], (image, x, y, r) => {
    border(image, 2);
    clock_ang(image, r[0] + x, 1);
    clock_ang(image, r[0] + x + 4, 1);
  }),
  // ROT
  lv4: level([9], (image, x, y, r) => {
    border(image, 2);
    var add = [0,1,3][x];
    clock_ang(image, r[0] + add, 1);
    wheel_ang(image, r[0] + add, 1 + x);
  }),
  // AND
  lv5: level([2 ** 4, 2 ** 4, 6], (image, x, y, r) => {
    border(image, 2);
    var idxs = comb([0,1,2,3], 2)[r[2]];
    for (var i = 0; i < 4; ++i) {
      var a = get_bit(r[0],i) || get_bit(r[1],i);
      var b = has(idxs, i);
      var c = a && b;
      switch (x) {
        case 0: if (a) wheel_ang(image, 1+i*2, 1); break;
        case 1: if (b) wheel_ang(image, 1+i*2, 1); break;
        case 2: if (c) wheel_ang(image, 1+i*2, 1); break;
      }
    }
  }),
  // AND
  lv6: level([2 ** 8, 2 ** 8], (image, x, y, r) => {
    border(image, 2);
    for (var i = 0; i < 8; ++i) {
      var a = get_bit(r[0],i);
      var b = get_bit(r[1],i);
      var c = a && b;
      switch (x) {
        case 0: if (a) clock_ang(image, i, 1); break;
        case 1: if (b) clock_ang(image, i, 1); break;
        case 2: if (c) clock_ang(image, i, 1); break;
      }
    }
  }),
  // XOR
  lv7: level([2 ** 4, 2 ** 4, 6], (image, x, y, r) => {
    border(image, 2);
    var idxs = comb([0,1,2,3], 2)[r[2]];
    for (var i = 0; i < 4; ++i) {
      var a = get_bit(r[0],i) || get_bit(r[1],i);
      var b = has(idxs, i);
      var c = a ^ b;
      switch (x) {
        case 0: if (a) wheel_ang(image, 1+i*2, 1); break;
        case 1: if (b) wheel_ang(image, 1+i*2, 1); break;
        case 2: if (c) wheel_ang(image, 1+i*2, 1); break;
      }
    }
  }),
  // XOR
  lv8: level([2 ** 8, 2 ** 8], (image, x, y, r) => {
    border(image, 2);
    for (var i = 0; i < 8; ++i) {
      var a = get_bit(r[0],i);
      var b = get_bit(r[1],i);
      var c = a ^ b;
      switch (x) {
        case 0: if (a) clock_ang(image, i, 1); break;
        case 1: if (b) clock_ang(image, i, 1); break;
        case 2: if (c) clock_ang(image, i, 1); break;
      }
    }
  }),
  // ROT AND
  lv9: level([2 ** 4, 2 ** 4, 6, 8], (image, x, y, r) => {
    border(image, 2);
    clock_ang(image, r[3] + x, 1);
    clock_ang(image, r[3] - x, 1);
    var idxs = comb([0,1,2,3], 2)[r[2]];
    for (var i = 0; i < 4; ++i) {
      var a = get_bit(r[0],i) || get_bit(r[1],i);
      var b = has(idxs, i);
      var c = a && b;
      switch (x) {
        case 0: if (a) wheel_ang(image, 1+i*2, 1); break;
        case 1: if (b) wheel_ang(image, 1+i*2, 1); break;
        case 2: if (c) wheel_ang(image, 1+i*2, 1); break;
      }
    }
  }),
  // ROT AND
  lv10: level([2 ** 8, 2 ** 8, 4, 4], (image, x, y, r) => {
    border(image, 2);
    wheel_ang(image, r[2] * 2     + x, 2);
    wheel_ang(image, r[3] * 2 + 1 - x, 3);
    for (var i = 0; i < 8; ++i) {
      var a = get_bit(r[0],i);
      var b = get_bit(r[1],i);
      var c = a && b;
      switch (x) {
        case 0: if (a) clock_ang(image, i, 1); break;
        case 1: if (b) clock_ang(image, i, 1); break;
        case 2: if (c) clock_ang(image, i, 1); break;
      }
    }
  }),
  // ROT XOR
  lv11: level([2 ** 4, 2 ** 4, 6, 8], (image, x, y, r) => {
    border(image, 2);
    clock_ang(image, r[3] + x, 1);
    clock_ang(image, r[3] - x, 1);
    var idxs = comb([0,1,2,3], 2)[r[2]];
    for (var i = 0; i < 4; ++i) {
      var a = get_bit(r[0],i) || get_bit(r[1],i);
      var b = has(idxs, i);
      var c = a ^ b;
      switch (x) {
        case 0: if (a) wheel_ang(image, 1+i*2, 1); break;
        case 1: if (b) wheel_ang(image, 1+i*2, 1); break;
        case 2: if (c) wheel_ang(image, 1+i*2, 1); break;
      }
    }
  }),
  // ROT XOR
  lv12: level([2 ** 8, 2 ** 8, 4, 4], (image, x, y, r) => {
    border(image, 2);
    wheel_ang(image, r[2] * 2     + x, 2);
    wheel_ang(image, r[3] * 2 + 1 - x, 3);
    for (var i = 0; i < 8; ++i) {
      var a = get_bit(r[0],i);
      var b = get_bit(r[1],i);
      var c = a ^ b;
      switch (x) {
        case 0: if (a) clock_ang(image, i, 1); break;
        case 1: if (b) clock_ang(image, i, 1); break;
        case 2: if (c) clock_ang(image, i, 1); break;
      }
    }
  }),
  // AND XOR
  lv13: level([2 ** 4, 2 ** 4, 6, 2 ** 4, 2 ** 4, 6], (image, x, y, r) => {
    border(image, 2);
    var idxs = comb([0,1,2,3], 2)[r[2]];
    for (var i = 0; i < 4; ++i) {
      var a = get_bit(r[0],i) || get_bit(r[1],i);
      var b = has(idxs, i);
      var c = a && b;
      switch (x) {
        case 0: if (a) wheel_ang(image, 1+i*2, 1); break;
        case 1: if (b) wheel_ang(image, 1+i*2, 1); break;
        case 2: if (c) wheel_ang(image, 1+i*2, 1); break;
      }
    }
    var idxs = comb([0,1,2,3], 2)[r[5]];
    for (var i = 0; i < 4; ++i) {
      var a = get_bit(r[3],i) || get_bit(r[4],i);
      var b = has(idxs, i);
      var c = a ^ b;
      switch (x) {
        case 0: if (a) clock_ang(image, 1+i*2, 1); break;
        case 1: if (b) clock_ang(image, 1+i*2, 1); break;
        case 2: if (c) clock_ang(image, 1+i*2, 1); break;
      }
    }
  }),
  // AND XOR
  lv14: level([2 ** 8, 2 ** 8, 2 ** 8, 2 ** 8], (image, x, y, r) => {
    border(image, 2);
    for (var i = 0; i < 8; ++i) {
      var a = get_bit(r[0],i);
      var b = get_bit(r[1],i);
      var c = a && b;
      switch (x) {
        case 0: if (a) clock_ang(image, i, 1); break;
        case 1: if (b) clock_ang(image, i, 1); break;
        case 2: if (c) clock_ang(image, i, 1); break;
      }
    }
    for (var i = 0; i < 8; ++i) {
      var a = get_bit(r[2],i);
      var b = get_bit(r[3],i);
      var c = a ^ b;
      switch (x) {
        case 0: if (a) wheel_ang(image, i, 1); break;
        case 1: if (b) wheel_ang(image, i, 1); break;
        case 2: if (c) wheel_ang(image, i, 1); break;
      }
    }
  }),
  // ROT ROT XOR AND
  lv15: level([8, 3, 2 ** 4, 2 ** 4, 6, 2 ** 4, 2 ** 4, 6, 8], (image, x, y, r) => {
    border(image, 2);
    clock_ang(image, r[0] + x, 1);
    clock_ang(image, r[0] + 4 + x, 1);
    clock_ang(image, r[0] + 1 - x, 1);
    var idxs = comb([0,1,2,3], 2)[r[4]];
    for (var i = 0; i < 4; ++i) {
      var a = get_bit(r[2],i) || get_bit(r[3],i);
      var b = has(idxs, i);
      var c = a ^ b;
      switch (x) {
        case 0: if (a) wheel_ang(image, 1+i*2, 1); break;
        case 1: if (b) wheel_ang(image, 1+i*2, 1); break;
        case 2: if (c) wheel_ang(image, 1+i*2, 1); break;
      }
    }
    var idxs = comb([0,1,2,3], 2)[r[7]];
    for (var i = 0; i < 4; ++i) {
      var a = get_bit(r[5],i) || get_bit(r[6],i);
      var b = has(idxs, i);
      var c = a && b;
      switch (x) {
        case 0: if (a) wheel_ang(image, i*2, 3); break;
        case 1: if (b) wheel_ang(image, i*2, 3); break;
        case 2: if (c) wheel_ang(image, i*2, 3); break;
      }
    }
  }),
  // ROT AND XOR


  lv16: level([2 ** 8, 2 ** 8], (image, x, y, r) => {
    border(image, 1)
    for (var i = 0; i < 8; ++i) {
      if (x === 2) {
        if (0 === get_bit(r[0], i) + get_bit(r[1], i)) {
          wheel_ang(image, i, 1)
        }
      }
      else {
        wheel_ang(image, i, get_bit(r[x], i))
      }
    }
  }),

  lv17: level([2 ** 3, 256, 70], (image, x, y, r) => {
    r = r.slice(0);
    var indices = comb([0,1,2,3,4,5,6,7], 4)[r[2]]; // [2,5,6]
    // ugly code, modularize pls
    var old = (r[0] << 1) | 1; // 0b0000DCBA
    r[0] = 0;
    for (var i = 0; i < 4; ++i) {
      if (get_bit(old, i)) {
        r[0] = set_bit(r[0], indices[i]);
      }
    }
    border(image, 3);
    for (var i = 0; i < 8; ++i) {
      var color = [2, 1, 3, 1, 2, 1, 3, 1];
      switch (x) {
        case 0:
          if (get_bit(r[0],i)) {
            wheel_ang(image, i, color[i]);
          }
          break;
        case 1:
          if (get_bit(r[1],i) && !get_bit(r[0],i)) {
            wheel_ang(image, i, color[i]);
          }
          break;
        case 2:
          if (!get_bit(r[1],i) && !get_bit(r[0],i)) {
            wheel_ang(image, i, color[i]);
          }
          break;
      }
    }
  }),


  lv18: level([2 ** 8, 2 ** 8], (image, x, y, r) => {
    border(image, 1)
    for (var i = 0; i < 8; ++i) {
      if (x === 2) {
        wheel_ang(image, i, 2 - get_bit(r[0], i) - get_bit(r[1], i))
      }
      else {
        wheel_ang(image, i, get_bit(r[x], i))
      }
    }
  }),
  
  lv19: level([3 ** 4, 3 ** 4], (image, x, y, r) => {
    border(image, 1)
    for (var i = 0; i <4; ++i) {
      switch (x) {
        case 2:
          var j = (get_value(r[0], i, 3) + get_value(r[1], i, 3) + 1)
          wheel_ang(image, i*2, mod(j, 3) + 1);
          break;
        default:
          wheel_ang(image, i*2, get_value(r[x], i, 3) + 1);
      }
    }
  }),

  
  lv20: level([8, 3 ** 5], (image, x, y, r) => {
    border(image, 2)
    clock_ang(image, mod(r[0] + x + 1, 8), 1)
    for (var i = 0; i < 5; ++i) {
      var color = get_value(r[1], i, 3)
      if (i === x + 1) {
        color = color + 1
      }
      wheel_ang(image, mod(i + r[0] , 8), mod(color, 3) + 1)
    }
  }),

  lv21: level([2 ** 8, 2 ** 8, 2 ** 8, 2 ** 8, 2 ** 8, 2 ** 8], (image, x, y, r) => {
    border(image, 2);
    for (var i = 0; i < 8; ++i) {
      var a = get_bit(r[0],i);
      var b = get_bit(r[1],i);
      var c = a ^ b;
      switch (x) {
        case 0: if (a) clock_ang(image, i, 1); break;
        case 1: if (b) clock_ang(image, i, 1); break;
        case 2: if (c) clock_ang(image, i, 1); break;
      }
    }
    for (var i = 0; i < 8; ++i) {
      var a = get_bit(r[2],i) || get_bit(r[3],i);
      var b = get_bit(r[4],i) || get_bit(r[5],i);
      var c = a && b;
      switch (x) {
        case 0: if (a) wheel_ang(image, i, 1 + mod(i+x,3)); break;
        case 1: if (b) wheel_ang(image, i, 1 + mod(i+x,3)); break;
        case 2: if (c) wheel_ang(image, i, 1 + mod(i+x,3)); break;
      }
    }
  }),


  lv22: level([8, 3 ** 5 ], (image, x, y, r) => {
    border(image, 2)
    var rotation = 1
    for (var i = 0; i < 5; ++i) {
      if (mod(get_value(r[1], i, 3), 3) === 0) {
        rotation ++
      }
    }
    center(image, 1)
    clock_ang(image, mod(r[0] + rotation * x    , 8), 1)
    for (var i = 0; i < 5; ++i) {
      wheel_ang(image, mod(i + r[0] + rotation * x + 2, 8), Math.min(mod(get_value(r[1], i, 3), 3), 1) * 2 + 1) 
    }
  }),

  lv23: level([8, 3 ** 6 ], (image, x, y, r) => {
    border(image, 2)
    var rotation = 0
    for (var j = 0; j < x; ++j) {
      rotation ++
      for (var i = 0; i < 3; ++i) {
        if (mod(get_value(r[1], i, 3) + j, 3) === 0) {
          rotation ++
        }
      }
    }
    center(image, 1)
    clock_ang(image, mod(r[0] + rotation - 3, 8), 1)
    clock_ang(image, mod(r[0] + rotation + 1, 8), 1)
    for (var i = 0; i < 3; ++i) {
      wheel_ang(image, mod(i + r[0] + rotation + 2, 8), mod(get_value(r[1], i, 3) + x, 3) + 1)
    }
  }),

 
  lv24: level([3 ** 8, 4], (image, x, y, r) => {
    border(image, 1)
    // Comment these for hard mode : 
    // { 
        clock_ang(image, r[1] + x, 1)
        clock_ang(image, r[1] + x + 4, 1)
    // }
    for (var i = 0; i < 8; ++i) {
      var col = get_value(r[0], i, 3)
      if (r[1] <= i && i <= r[1] + x) {
        col++
      }
      if (r[1]  <= mod(i + 4, 8) && mod(i + 4, 8) <= r[1] + x) {
        col--
      }
      col = mod(col, 3) + 1
      if (i === mod(r[1] + 3, 8) || i === mod(r[1] - 1, 8)) {
        col = 0
      }
      wheel_ang(image, i, col)
    }
  }),

  lv25: level([3 ** 8, 8], (image, x, y, r) => {
    border(image, 2)
    // uncomment for easy mode
    // clock_ang(image, r[1] + x , 1)
    // clock_ang(image, r[1] + 4 + x , 1)
    for (var i = 0; i < 8; ++i) {
      var col = get_value(r[0], i, 3)
      if (i === mod(r[1] + x, 8) || i === mod(r[1] + x + 4, 8)) {
        col ++
      }
      col = mod(col, 3) + 1
      if (i === mod(r[1] - 1, 8) || i === mod(r[1] + 4 - 1, 8)) {
        col = 0
      }
      wheel_ang(image, i, col)
    }
  }),
}


// export const levels = {
// lv20_old: level([8, 4 ** 8], (image, x, y, r) => {
//   border(image, 2)
//   for (var i = 0; i < 8; ++i) {
//     var color = get_color(r[1], i)
//     if (mod(r[0] + x, 8) === i) {
//       color = color + 1
//       clock_ang(image, i, 1)
//     }
//     wheel_ang(image, i, mod(color, 4))
//   }
// }),

//   lv25_old: level([2 ** 8, 2 ** 8], (image, x, y, r) => {
//     border(image, 1)
//     for (var i = 0; i < 8; ++i) {
//       switch (x) {
//         case 2:
//           if (get_bit(r[0], mod(i + 4, 8)) && get_bit(r[1], mod(i + 4, 8))) {
//             wheel_ang(image, i, 1)
//           }
//           break
//         default:
//             wheel_ang(image, i, get_bit(r[x], i))
//         break
//       }
//     }
//   }),

//   lv21_old: level([2 ** 8], (image, x, y, r) => {
//     border(image, 2)
//     for (var i = 0; i < 8; ++i) {
//       var col = 0
//       for (var j = 0; j < x + 1; ++j) {
//         col = col + get_bit(r[0], mod(i - j, 8))
//       }
//       clock_ang(image, mod(i + x, 8), get_bit(r[0], i))
//       wheel_ang(image, i, col)
//     }
//   }),

//   lv19_old: level([4 ** 4, 4 ** 4], (image, x, y, r) => {
//     border(image, 1)
//     for (var i = 0; i <4; ++i) {
//       switch (x) {
//         case 2:
//           var j = (get_color(r[0], i) + get_color(r[1], i))
//           wheel_ang(image, i*2, mod(j, 4));
//           break;
//         default:
//           wheel_ang(image, i*2, get_color(r[x], i));
//       }
//     }
//   }),
  
//   lv16_old: level([3, 2 ** 8], (image, x, y, r) => {
//     border(image, mod(r[0] + x, 3) + 1)
//     for (var i = 0; i < 8; ++i) {
//       switch (mod(r[0] + x, 3)) { 
//         case 0:
//           wheel_ang(image, i, get_bit(r[1], i))
//           break;
//         case 1:
//           wheel_ang(image, i, get_bit(r[1], i) * 3)
//           break;
//         case 2:
//           clock_ang(image, i, get_bit(r[1], i))
//           break;
//       }
//     }
//   }),
// }
