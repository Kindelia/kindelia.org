export function fmtNumber(num) {
  return num < 10 && num >= 0 ? `0${num}` : num;
}