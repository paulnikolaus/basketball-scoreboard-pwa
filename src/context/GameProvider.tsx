// React import
import React, { useEffect, useReducer } from "react";

// Import reducer + saved state loading/saving
import { gameReducer } from "../state/gameReducer";
import { loadGameState, saveGameState } from "../state/gameStorage";

// Import context object
import { GameContext } from "./GameContext";

/**
 * GameProvider component
 *
 * Responsible only for:
 * - creating state via useReducer
 * - restoring and saving state in localStorage
 * - passing state + dispatch into context
 *
 * This file exports ONLY a component.
 */
export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  /**
   * useReducer with lazy initialization from the saved game
   */
  const [state, dispatch] = useReducer(gameReducer, undefined, loadGameState);

  /**
   * Save the game after every state change
   */
  useEffect(() => {
    saveGameState(state);
  }, [state]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
