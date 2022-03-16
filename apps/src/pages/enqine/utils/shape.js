import { array_equal } from "./array";

// create a shape
export function shape_create(border, center, clock, wheel) {
  return {border, center, clock, wheel};
}
// create an empty shape
export function shape_empty() {
  return shape_create(0, 0, [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]);
}
// create an empty shape with a border
export function shape_empty_with_border(border) {
  return {...shape_empty(), border}
}

export function shape_equal(shapeA, shapeB) {
  return shapeA.border === shapeB.border &&
         shapeA.center === shapeB.center &&
         array_equal(shapeA.clock, shapeB.clock) &&
         array_equal(shapeA.wheel, shapeB.wheel)
}