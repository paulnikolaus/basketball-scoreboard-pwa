import { useEffect } from "react";
import { useGame } from "../context/GameContext";

/**
 * Custom hook that drives the game timer.
 *
 * It:
 * - Dispatches "TICK" every second
 * - Only runs when the game is marked as running
 */
export const useGameTimer = () => {
  const { state, dispatch } = useGame();

  useEffect(() => {
    if (!state.isGameRunning) return;

    // Dispatch TICK every 100ms (0.1 seconds)
    const interval = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 100);

    return () => clearInterval(interval);
  }, [state.isGameRunning, dispatch]);
};
