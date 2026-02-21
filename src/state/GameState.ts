/**
 * Represents the complete state of a basketball game
 * as used by the scoreboard application.
 *
 * All time values are stored in seconds.
 */
export interface GameState {
  /** Current score of the home team */
  homeScore: number;

  /** Current score of the away team */
  awayScore: number;

  /**
   * Remaining time on the main game clock (in seconds).
   * Example: 10 * 60 = 600 seconds = 10 minutes.
   */
  gameClock: number;

  /**
   * Remaining time on the shot clock (in seconds).
   * Standard FIBA/NBA shot clock = 24 seconds.
   */
  shotClock: number;

  /** Indicates whether the main game clock is currently running */
  isGameRunning: boolean;

  /** Indicates whether the shot clock is currently running */
  isShotClockRunning: boolean;
}

/**
 * Creates the initial default state for a new game.
 *
 * Default configuration:
 * - Score: 0–0
 * - Game clock: 10 minutes (typical quarter length)
 * - Shot clock: 24 seconds
 * - Both clocks stopped
 */
export const createInitialGameState = (): GameState => ({
  homeScore: 0,
  awayScore: 0,

  // 10 minutes expressed in seconds
  gameClock: 10 * 60,

  // Standard 24-second shot clock
  shotClock: 24,

  isGameRunning: false,
  isShotClockRunning: false,
});
