/**
 * Indicates that a value exists within a provided enum.
 * @param obj - An enum object.
 * @param value - A value.
 * @returns A boolean.
 */
export const isValueInEnum = <T>(obj: Record<string, T>, value: T): boolean => {
  return Object.values(obj).includes(value);
};
