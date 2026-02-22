/**
 * Represents all possible actions that can modify the GameState.
 *
 * This type is typically used in a reducer pattern (e.g. React useReducer)
 * to ensure strict, type-safe state transitions.
 */
export type GameAction =
  /**
   * Increase the home team's score.
   * `amount` is typically 1, 2, or 3 (free throw, field goal, three-pointer).
   */
  | { type: "INCREMENT_HOME"; amount: number }

  /**
   * Increase the away team's score.
   * `amount` is typically 1, 2, or 3.
   */
  | { type: "INCREMENT_AWAY"; amount: number }

  /**
   * Decrease the home team's score.
   * Useful for correcting input mistakes.
   */
  | { type: "DECREMENT_HOME"; amount: number }

  /**
   * Decrease the away team's score.
   * Useful for correcting input mistakes.
   */
  | { type: "DECREMENT_AWAY"; amount: number }

  /**
   * Reset only the team scores to zero.
   *
   * Important:
   * - Does NOT modify the clocks
   * - Does NOT stop the game
   */
  | { type: "RESET_SCORE" }

  /**
   * Starts the main game clock.
   */
  | { type: "START_GAME" }

  /**
   * Stops the main game clock (and typically the shot clock).
   */
  | { type: "STOP_GAME" }

  /**
   * Set the time on the main game clock to a specific value (in seconds).
   */
  | { type: "SET_GAME_TIME"; seconds: number }

  /**
   * Resets the entire game state to its initial configuration
   * (score = 0–0, clocks reset, not running).
   */
  | { type: "RESET_GAME" }

  /**
   * Advances the game by one time unit (usually one second).
   * This action is typically dispatched on an interval.
   */
  | { type: "TICK" }

  /**
   * Starts the shot clock.
   */
  | { type: "START_SHOT_CLOCK" }

  /**
   * Stops the shot clock.
   */
  | { type: "STOP_SHOT_CLOCK" }

  /**
   * Sets the shot clock to a specific value (in seconds).
   * Useful for special cases (e.g., 14 seconds after offensive rebound).
   */
  | { type: "SET_SHOT_CLOCK"; seconds: number };
