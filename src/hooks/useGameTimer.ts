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
    // If the game is not running, do nothing.
    if (!state.isGameRunning) return;

    // Create interval that dispatches TICK every 1000ms
    const interval = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);

    // Cleanup: clear interval when:
    // - component unmounts
    // - isGameRunning changes
    return () => clearInterval(interval);
  }, [state.isGameRunning, dispatch]);
};
