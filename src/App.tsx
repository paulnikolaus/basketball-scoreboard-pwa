// Import state access hook
import { useGame } from "./context/GameContext";

// Import timer engine hook
import { useGameTimer } from "./hooks/useGameTimer";

function App() {
  // Activate timer logic (dispatches TICK when running)
  useGameTimer();

  // Extract state and dispatch from context
  const { state, dispatch } = useGame();

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Basketball Scoreboard</h1>

      {/* ------------------ SCORE SECTION ------------------ */}
      <h2>Score</h2>

      <p>Home: {state.homeScore}</p>
      <button
        onClick={() =>
          dispatch({ type: "INCREMENT_HOME", amount: 1 })
        }
      >
        +1 Home
      </button>

      <p>Away: {state.awayScore}</p>
      <button
        onClick={() =>
          dispatch({ type: "INCREMENT_AWAY", amount: 1 })
        }
      >
        +1 Away
      </button>

      <hr />

      {/* ------------------ CLOCK SECTION ------------------ */}
      <h2>Game Clock</h2>
      <p>{state.gameClock}s</p>

      <h2>Shot Clock</h2>
      <p>{state.shotClock}s</p>

      <hr />

      {/* ------------------ CONTROL SECTION ------------------ */}
      <button onClick={() => dispatch({ type: "START_GAME" })}>
        Start Game
      </button>

      <button onClick={() => dispatch({ type: "STOP_GAME" })}>
        Stop Game
      </button>

      <button onClick={() => dispatch({ type: "RESET_GAME" })}>
        Reset Game
      </button>

      <button onClick={() => dispatch({ type: "RESET_SHOT_CLOCK" })}>
        Reset Shot Clock
      </button>
    </div>
  );
}

export default App;