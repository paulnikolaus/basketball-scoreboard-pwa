import type { GameState } from "./GameState";
import { createInitialGameState } from "./GameState";
import type { GameAction } from "./GameActions";

/**
 * Reducer function responsible for handling all state transitions
 * of the basketball game.
 *
 * This follows the standard reducer pattern:
 * (currentState, action) => newState
 *
 * The reducer must remain pure:
 * - No side effects
 * - No direct state mutation
 * - Always return a new state object
 */
export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    /**
     * Increase home team score by the given amount.
     */
    case "INCREMENT_HOME":
      return { ...state, homeScore: state.homeScore + action.amount };

    /**
     * Increase away team score by the given amount.
     */
    case "INCREMENT_AWAY":
      return { ...state, awayScore: state.awayScore + action.amount };

    /**
     * Decrease home team score.
     * Score cannot drop below 0.
     */
    case "DECREMENT_HOME":
      return {
        ...state,
        homeScore: Math.max(0, state.homeScore - action.amount),
      };

    /**
     * Decrease away team score.
     * Score cannot drop below 0.
     */
    case "DECREMENT_AWAY":
      return {
        ...state,
        awayScore: Math.max(0, state.awayScore - action.amount),
      };

    /**
     * Start the game:
     * - Main game clock starts running if time remains
     * - Shot clock is controlled separately
     */
    case "START_GAME":
      return {
        ...state,
        // An expired period must be given more time before it can restart.
        isGameRunning: state.gameClock > 0,
      };

    /**
     * Stop/pause the game:
     * - Both clocks are halted
     */
    case "STOP_GAME":
      return {
        ...state,
        isGameRunning: false,
        isShotClockRunning: false,
      };

    /**
     * Reset only the team scores.
     * Does NOT affect clocks.
     */
    case "RESET_SCORE":
      return {
        ...state,
        homeScore: 0,
        awayScore: 0,
      };

    /**
     * Reset the entire game state to its initial values.
     */
    case "RESET_GAME":
      return createInitialGameState();

    /**
     * Set the time on the main game clock to a specific value (in seconds).
     */
    case "SET_GAME_TIME":
      // Set a custom time (used for testing)
      return {
        ...state,
        gameClock: action.seconds,
      };

    /**
     * Starts the shot clock.
     */
    case "START_SHOT_CLOCK":
      return {
        ...state,
        // Both clocks need remaining time. The game clock does not have to
        // be running, so the operator can control the shot clock separately.
        isShotClockRunning: state.gameClock > 0 && state.shotClock > 0,
      };

    /**
     * Stops the shot clock.
     */
    case "STOP_SHOT_CLOCK":
      return {
        ...state,
        isShotClockRunning: false,
      };

    /**
     * Manually set the shot clock to a specific number of seconds.
     * Useful for special cases (e.g. 14 seconds reset).
     */
    case "SET_SHOT_CLOCK":
      return { ...state, shotClock: action.seconds };

    /**
     * Advance time by the real time elapsed since the last tick.
     *
     * - Game clock decreases only if it is running.
     * - Shot clock decreases only if it is running.
     * - Neither clock can go below 0.
     * - Both clocks stop when the game clock reaches 0.
     */
    case "TICK": {
      const newGameClock = state.isGameRunning
        ? Math.max(0, state.gameClock - action.elapsed)
        : state.gameClock;

      // A delayed tick may cover more time than remains in the period.
      // For example, if 5 seconds elapsed but only 1 second of game time
      // remained, advance the shot clock by only that final second.
      // When the game clock is paused, the shot clock advances independently.
      const shotElapsed = state.isGameRunning
        ? Math.min(action.elapsed, state.gameClock)
        : action.elapsed;
      const newShotClock = state.isShotClockRunning
        ? Math.max(0, state.shotClock - shotElapsed)
        : state.shotClock;

      return {
        ...state,
        gameClock: newGameClock,
        shotClock: newShotClock,
        // Period end stops the game clock. Otherwise, preserve its run state.
        isGameRunning: newGameClock === 0 ? false : state.isGameRunning,

        // Period end stops both clocks. Shot-clock expiration stops only
        // the shot clock, allowing the game clock to continue.
        isShotClockRunning:
          newGameClock === 0 || newShotClock === 0
            ? false
            : state.isShotClockRunning,
      };
    }

    /**
     * Fallback case for unknown actions.
     * Returns the current state unchanged.
     */
    default:
      return state;
  }
}
