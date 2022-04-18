export const levels = [
  require('./level_07'),
  require('./level_05'),
].map(item => item.default);

// this code below generate an array of levels 
// from 01 to N automatically

// const fmt = (n) => n < 10 ? `0${n}` : `${n}`;
// export const levels = 
//   Array.from(
//     {length: N}, // add number of levels 
//     (_, i) => require(`./level_${fmt(i + 1)}`).default
//   );