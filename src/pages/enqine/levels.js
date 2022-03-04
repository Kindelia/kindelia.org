import { shape_create, shape_empty } from "./utils/shape";

var image_create = shape_create;
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
          console.log(rnd);
          if (seen[n+"-"+rnd] === undefined) {
            line_rnds.push(rnd);
            seen[n+"-"+rnd] = 1;
            break;
          }
        }
      }
      rnds.push(line_rnds);
    }
    console.log("?", JSON.stringify(rnds));

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
  // Draw the same shape
  same_shape: level([3], (image, x, y, r) => {
    border(image, 1 + r[0]);
  }),
  // A dot moves to the right
  // Same as Mensa level 1
  line_walker: level([3], (image, x, y, r) => {
    border(image, 3);
    wheel_xy(image, x, y, 1 + r[0]);
  }),
  // Find the image that is missing
  missing_shape: level([3], (image, x, y, r) => {
    console.log(r);
    border(image, 1 + mod(r[0] + x, 3));
  }),
  // Draw the same shape and the missing center
  // Same as Mensa level 2
  missing_shape_and_center: level([3,3], (image, x, y, r) => {
    border(image, 1 + mod(x + r[0], 3));
    center(image, 1 + mod(x + r[1], 3));
  }),

  // Sipher's art
  sipher_art_0: level([6, 2 ** 8], (image, x, y, r) => {
    var style = permut(["white", "black", "clock"])[r[0]];
    var draw = [
      get_bit(r[1],0),
      get_bit(r[1],1),
      get_bit(r[1],2),
      get_bit(r[1],3),
      get_bit(r[1],4),
      get_bit(r[1],5),
      get_bit(r[1],6),
      get_bit(r[1],7),
    ];
    for (var i = 0; i < 8; ++i) {
      if (draw[i]) {
        switch (style[x]) {
          case "white":
            border(image, 2);
            wheel_ang(image, i, 1);
            break;
          case "clock":
            border(image, 3);
            clock_ang(image, i, 1);
            break;
          case "black":
            border(image, 1);
            wheel_ang(image, i, 3);
            break;
        }
      }
    }
  }),

  sipher_art_1: level([2 ** 3, 256, 70], (image, x, y, r) => {
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
  })
};