/**
 * Truncates a given text to a specified length and adds an ellipsis at the end.
 *
 * @param {string} text - The text to be truncated.
 * @param {number} length - The maximum length of the truncated text.
 * @returns {string} The truncated text with an ellipsis at the end.
 */
export function truncateText(text: string, length: number): string {
  return text.slice(0, length) + "...";
}
