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
     * - Main game clock starts running
     * - Shot clock starts running
     */
    case "START_GAME":
      return {
        ...state,
        isGameRunning: true,
        isShotClockRunning: true,
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
     * Reset the entire game state to its initial values.
     */
    case "RESET_GAME":
      return createInitialGameState();

    /**
     * Reset the shot clock to the default 24 seconds.
     * Typically triggered on change of possession.
     */
    case "RESET_SHOT_CLOCK":
      return { ...state, shotClock: 24 };

    /**
     * Manually set the shot clock to a specific number of seconds.
     * Useful for special cases (e.g. 14 seconds reset).
     */
    case "SET_SHOT_CLOCK":
      return { ...state, shotClock: action.seconds };

    /**
     * Advance time by one second.
     *
     * - Only runs if the game is currently running.
     * - Game clock decreases until 0.
     * - Shot clock decreases only if it is running.
     * - Neither clock can go below 0.
     */
    case "TICK":
      if (!state.isGameRunning) return state;

      return {
        ...state,
        gameClock: Math.max(0, state.gameClock - 1),
        shotClock: state.isShotClockRunning
          ? Math.max(0, state.shotClock - 1)
          : state.shotClock,
      };

    /**
     * Fallback case for unknown actions.
     * Returns the current state unchanged.
     */
    default:
      return state;
  }
}
