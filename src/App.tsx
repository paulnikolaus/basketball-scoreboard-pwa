import { useGame } from "./context/GameContext";
import { useGameTimer } from "./hooks/useGameTimer";
import { formatGameTime } from "./utils/formatTime";

function App() {
  useGameTimer();

  const { state, dispatch } = useGame();

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Basketball Scoreboard</h1>

      {/* ---------------- SCORE ---------------- */}

      <h2>Score</h2>

      <p>Home: {state.homeScore}</p>
      <button onClick={() => dispatch({ type: "INCREMENT_HOME", amount: 1 })}>
        +1 Home
      </button>

      <p>Away: {state.awayScore}</p>
      <button onClick={() => dispatch({ type: "INCREMENT_AWAY", amount: 1 })}>
        +1 Away
      </button>

      <hr />

      {/* ---------------- GAME CLOCK ---------------- */}

      <h2>Game Clock</h2>

      <p style={{ fontSize: "2rem" }}>{formatGameTime(state.gameClock)}</p>

      <button onClick={() => dispatch({ type: "START_GAME" })}>
        Start Game
      </button>

      <button onClick={() => dispatch({ type: "STOP_GAME" })}>Stop Game</button>

      <button onClick={() => dispatch({ type: "RESET_GAME" })}>Reset</button>

      {/* Set Time for fast testing */}
      <button onClick={() => dispatch({ type: "SET_GAME_TIME", seconds: 10 })}>
        Set 10s
      </button>

      <hr />

      {/* ---------------- SHOT CLOCK ---------------- */}

      <h2>Shot Clock</h2>

      <p style={{ fontSize: "2rem" }}>{state.shotClock.toFixed(1)}</p>

      <button onClick={() => dispatch({ type: "START_SHOT_CLOCK" })}>
        Start Shot Clock
      </button>

      <button onClick={() => dispatch({ type: "STOP_SHOT_CLOCK" })}>
        Stop Shot Clock
      </button>

      <button onClick={() => dispatch({ type: "SET_SHOT_CLOCK", seconds: 24 })}>
        24s
      </button>

      <button onClick={() => dispatch({ type: "SET_SHOT_CLOCK", seconds: 14 })}>
        14s
      </button>
    </div>
  );
}

export default App;
