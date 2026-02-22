// Import useContext hook
import { useContext } from "react";

// Import context + type
import { GameContext } from "./GameContext";
import type { GameContextType } from "./GameContext";

/**
 * Custom hook for safely consuming GameContext.
 *
 * Throws an error if used outside GameProvider.
 */
export const useGame = (): GameContextType => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("useGame must be used inside a GameProvider");
  }

  return context;
};
