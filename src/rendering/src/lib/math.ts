/**
 * Clamps a value between a min and max.
 * @param value - A value to clamp.
 * @param min - Minimum allowed value.
 * @param max - Maximum allowed value.
 * @returns A number.
 */
export function clamp(value: number, min: number, max: number): number {
  if (value < min) {
    return min;
  } else if (value >= max) {
    return max;
  } else {
    return value;
  }
}

/**
 * Cycles through values given a min and max.
 * @param value - A value.
 * @param min - Minimum allowed value.
 * @param max - Maximum allowed value.
 * @returns A number.
 */
export function cycle(value: number, min: number, max: number): number {
  if (value < min) {
    return max;
  } else if (value > max) {
    return min;
  } else {
    return value;
  }
}
