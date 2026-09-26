import { useEffect } from "react";
import { useGame } from "../context/useGame";

/**
 * Timer engine:
 *
 * Dispatches TICK every 100ms whenever
 * either the game clock OR shot clock is running.
 *
 * Each TICK carries the real time elapsed since the previous one,
 * measured with performance.now(). This keeps the clocks accurate
 * even when the browser delays or throttles the interval
 * (background tab, locked screen, busy device).
 */
export const useGameTimer = () => {
  const { state, dispatch } = useGame();

  const isAnyClockRunning = state.isGameRunning || state.isShotClockRunning;

  useEffect(() => {
    // If neither clock is running, do nothing
    if (!isAnyClockRunning) return;

    let lastTimestamp = performance.now();

    const interval = setInterval(() => {
      const now = performance.now();
      dispatch({ type: "TICK", elapsed: (now - lastTimestamp) / 1000 });
      lastTimestamp = now;
    }, 100);

    return () => clearInterval(interval);
  }, [isAnyClockRunning, dispatch]);
};
