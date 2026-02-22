// React import
import React, { useReducer } from "react";

// Import reducer + state initializer
import { gameReducer } from "../state/gameReducer";
import { createInitialGameState } from "../state/GameState";

// Import context object
import { GameContext } from "./GameContext";

/**
 * GameProvider component
 *
 * Responsible only for:
 * - creating state via useReducer
 * - passing state + dispatch into context
 *
 * This file exports ONLY a component.
 */
export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  /**
   * useReducer with lazy initialization
   */
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    createInitialGameState,
  );

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
