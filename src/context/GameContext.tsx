// Import React's createContext function
import React, { createContext } from "react";

// Import state/action types
import type { GameState } from "../state/GameState";
import type { GameAction } from "../state/GameActions";

/**
 * Defines what the context exposes.
 *
 * - state → full GameState
 * - dispatch → reducer dispatcher
 */
export interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

/**
 * Create and export the React context.
 *
 * No components are exported here.
 * This keeps Fast Refresh happy.
 */
export const GameContext = createContext<GameContextType | undefined>(
  undefined,
);
