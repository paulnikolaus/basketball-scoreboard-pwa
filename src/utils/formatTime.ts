/**
 * Format game time:
 *
 * - >= 10 seconds → MM:SS
 * - < 10 seconds  → SS.t
 */
export const formatGameTime = (seconds: number): string => {
  // If below 10 seconds, show one decimal
  if (seconds < 10) {
    return seconds.toFixed(1);
  }

  // Otherwise format as MM:SS
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const paddedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

  return `${minutes}:${paddedSeconds}`;
};
