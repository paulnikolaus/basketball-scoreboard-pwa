/**
 * Clocks allow fractional seconds, but never negative values,
 * NaN, or Infinity.
 */
export const isValidTime = (value: unknown): value is number =>
  typeof value === "number" &&
  Number.isFinite(value) &&
  value >= 0;

/**
 * Scores and scoring amounts must be whole numbers that
 * JavaScript can represent exactly.
 */
export const isValidScore = (value: unknown): value is number =>
  typeof value === "number" &&
  Number.isSafeInteger(value) &&
  value >= 0;
