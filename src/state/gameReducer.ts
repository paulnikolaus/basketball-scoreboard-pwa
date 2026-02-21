import type { GameState } from "./GameState";
import { createInitialGameState } from "./GameState";
import type { GameAction } from "./GameActions";

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "INCREMENT_HOME":
      return { ...state, homeScore: state.homeScore + action.amount };

    case "INCREMENT_AWAY":
      return { ...state, awayScore: state.awayScore + action.amount };

    case "DECREMENT_HOME":
      return {
        ...state,
        homeScore: Math.max(0, state.homeScore - action.amount),
      };

    case "DECREMENT_AWAY":
      return {
        ...state,
        awayScore: Math.max(0, state.awayScore - action.amount),
      };

    case "START_GAME":
      return {
        ...state,
        isGameRunning: true,
        isShotClockRunning: true,
      };

    case "STOP_GAME":
      return {
        ...state,
        isGameRunning: false,
        isShotClockRunning: false,
      };

    case "RESET_GAME":
      return createInitialGameState();

    case "RESET_SHOT_CLOCK":
      return { ...state, shotClock: 24 };

    case "SET_SHOT_CLOCK":
      return { ...state, shotClock: action.seconds };

    case "TICK":
      if (!state.isGameRunning) return state;

      return {
        ...state,
        gameClock: Math.max(0, state.gameClock - 1),
        shotClock: state.isShotClockRunning
          ? Math.max(0, state.shotClock - 1)
          : state.shotClock,
      };

    default:
      return state;
  }
}
