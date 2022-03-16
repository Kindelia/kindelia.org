import { random } from "./random";

// metadata about attributes
export const attrs = {
  border: {
    max: 3,
    is_array: false,
    array_size: 0
  },
  center: {
    max: 2,
    is_array: false,
    array_size: 0
  },
  clock: {
    max: 1,
    is_array: true,
    array_size: 8
  },
  wheel: {
    max: 3,
    is_array: true,
    array_size: 8
  },
}

// get max value of an attribute
export function attr_max(attr) {
  return attrs[attr].max;
}

// verify if an attribute is an arrray
export function attr_is_array(attr) {
  return attrs[attr].is_array;
}

// get size of attribute array
export function attr_array_size(attr) {
  return attrs[attr].array_size;
}

// get a random attribute value
export function attr_random(attr) {
  const max = attr_max(attr);
  return attr_is_array(attr) ?
    Array.from({length: attr_array_size(attr)}, _ => random.integer(0, max)) :
    random.integer(0, max);
}