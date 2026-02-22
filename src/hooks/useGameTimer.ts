import { useEffect } from "react";
import { useGame } from "../context/useGame";

/**
 * Timer engine:
 *
 * Dispatches TICK every 100ms whenever
 * either the game clock OR shot clock is running.
 */
export const useGameTimer = () => {
  const { state, dispatch } = useGame();

  useEffect(() => {
    // If neither clock is running, do nothing
    if (!state.isGameRunning && !state.isShotClockRunning) return;

    const interval = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 100);

    return () => clearInterval(interval);
  }, [state.isGameRunning, state.isShotClockRunning, dispatch]);
};
