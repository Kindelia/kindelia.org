import { shape_create } from "../utils/shape.js";

export default function() {
  return [
    [
      shape_create(1,2,[0,1,1,0,0,0,0,0], [0,1,1,0,0,0,0,0]),
      shape_create(1,2,[0,1,1,0,0,0,0,0], [0,1,1,0,0,0,0,0]),
      shape_create(1,2,[0,1,1,0,0,0,0,0], [0,1,1,0,0,0,0,0]),
    ],
    [
      shape_create(2,0,[0,1,0,0,1,0,0,0], [0,1,3,0,0,0,2,0]),
      shape_create(2,0,[0,1,0,0,1,0,0,0], [0,1,3,0,0,0,2,0]),
      shape_create(2,0,[0,1,0,0,1,0,0,0], [0,1,3,0,0,0,2,0]),
    ],
    [
      shape_create(3,3,[1,1,1,1,1,1,1,1], [3,3,3,3,3,3,3,3]),
      shape_create(3,3,[1,1,1,1,1,1,1,1], [3,3,3,3,3,3,3,3]),
      shape_create(3,3,[1,1,1,1,1,1,1,1], [3,3,3,3,3,3,3,3]),
    ]
  ]
}