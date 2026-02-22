/**
 * Format game clock time.
 *
 * Rules:
 * - >= 10 seconds → MM:SS
 * - < 10 seconds  → SS.t (one decimal place)
 *
 * Examples:
 *   125  → "2:05"
 *   10   → "0:10"
 *   9.8  → "9.8"
 */
export const formatGameTime = (seconds: number): string => {
  /**
   * If below 10 seconds,
   * show one decimal place.
   */
  if (seconds < 10) {
    return seconds.toFixed(1);
  }

  /**
   * Otherwise format as MM:SS.
   */
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  /**
   * Pad seconds with leading zero if needed.
   */
  const paddedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

  return `${minutes}:${paddedSeconds}`;
};

/**
 * Format shot clock time.
 *
 * Rules:
 * - >= 10 seconds → show whole seconds (no decimals)
 * - < 10 seconds  → show tenths of a second
 *
 * This matches real basketball scoreboards.
 *
 * Examples:
 *   24     → "24"
 *   18.7   → "18"
 *   9.94   → "9.9"
 *   3.456  → "3.4"
 */
export const formatShotClock = (seconds: number): string => {
  /**
   * For 10 seconds and above:
   * show whole seconds.
   */
  if (seconds >= 10) {
    return Math.floor(seconds).toString();
  }

  /**
   * Below 10 seconds:
   * truncate (not round) to 1 decimal.
   *
   * We truncate to avoid:
   *   9.99 becoming 10.0
   */
  const truncated = Math.floor(seconds * 10) / 10;

  return truncated.toFixed(1);
};
