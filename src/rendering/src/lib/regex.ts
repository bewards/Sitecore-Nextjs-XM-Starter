/**
 * Determines if text is composed of only alphanumeric characters.
 * @param text - A string.
 * @returns A boolean.
 */
export function isAlphanumeric(text: string): boolean {
  return text.match(/^[a-zA-Z0-9]{1}$/) !== null;
}
