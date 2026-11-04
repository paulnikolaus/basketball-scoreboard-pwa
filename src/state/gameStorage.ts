import type { GameState } from "./GameState";
import { createInitialGameState } from "./GameState";
import { isValidScore, isValidTime } from "./gameValidation";

/**
 * Persists the game state in localStorage so a reload,
 * an accidental swipe or an app restart doesn't lose the game.
 */
const STORAGE_KEY = "basketball-scoreboard:game-state";

/**
 * Checks that stored data has the shape of a GameState
 * and contains valid scores and clock values.
 * Protects against corrupted data or data from an older app version.
 */
const isGameState = (value: unknown): value is GameState => {
  if (typeof value !== "object" || value === null) return false;

  const state = value as Record<string, unknown>;

  return (
    isValidScore(state.homeScore) &&
    isValidScore(state.awayScore) &&
    isValidTime(state.gameClock) &&
    isValidTime(state.shotClock) &&
    typeof state.isGameRunning === "boolean" &&
    typeof state.isShotClockRunning === "boolean"
  );
};

/**
 * Loads the saved game, or a fresh game if nothing valid is stored.
 *
 * Clocks are always restored as stopped: we can't know how much
 * time passed while the app was closed, so the operator restarts them.
 */
export const loadGameState = (): GameState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return createInitialGameState();

    const parsed: unknown = JSON.parse(stored);
    if (!isGameState(parsed)) return createInitialGameState();

    return { ...parsed, isGameRunning: false, isShotClockRunning: false };
  } catch {
    // Storage unavailable (e.g. private mode) or invalid JSON
    return createInitialGameState();
  }
};

/**
 * Saves the current game state.
 */
export const saveGameState = (state: GameState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable or full — the app keeps working without saving
  }
};
