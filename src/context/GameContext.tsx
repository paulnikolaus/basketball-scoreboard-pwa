// React imports for creating context and managing reducer state
import { createContext, useContext, useReducer } from "react";

// Import reducer function that handles all state transitions
import { gameReducer } from "../state/gameReducer";

// Import factory function to create a fresh initial game state
import { createInitialGameState } from "../state/GameState";

// Import types using `import type` because they do not exist at runtime
import type { GameState } from "../state/GameState";
import type { GameAction } from "../state/GameActions";

/**
 * Defines the shape of what the context will expose.
 * We expose:
 *  - state  → the full GameState object
 *  - dispatch → function to send actions to the reducer
 */
interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

/**
 * Create the actual React context.
 * Initial value is undefined because it must be used inside a Provider.
 */
const GameContext = createContext<GameContextType | undefined>(undefined);

/**
 * GameProvider component:
 *
 * Wraps the entire app and provides:
 *  - state management via useReducer
 *  - access to state and dispatch via context
 */
export const GameProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  /**
   * useReducer setup:
   *
   * - gameReducer → handles transitions
   * - undefined   → lazy initialization pattern
   * - createInitialGameState → function that returns initial state
   *
   * Using lazy initialization ensures reset logic is clean
   * and avoids accidental shared state.
   */
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    createInitialGameState
  );

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

/**
 * Custom hook for accessing the GameContext.
 *
 * This prevents:
 *  - Having to import useContext everywhere
 *  - Silent misuse outside provider
 *
 * If used outside GameProvider, we throw an explicit error.
 */
export const useGame = (): GameContextType => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("useGame must be used inside a GameProvider");
  }

  return context;
};
