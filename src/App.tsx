import { useGame } from "./context/GameContext";
import { useGameTimer } from "./hooks/useGameTimer";
import { formatGameTime } from "./utils/formatTime";

function App() {
  useGameTimer();
  const { state, dispatch } = useGame();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        backgroundColor: "#111",
        color: "white",
        fontFamily: "system-ui",
        padding: "1rem",
        gap: "1rem",
      }}
    >
      {/* ================= HOME COLUMN ================= */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Label */}
        <div
          style={{
            textAlign: "center",
            fontSize: "1rem",
            marginBottom: "0.5rem",
            letterSpacing: "2px",
          }}
        >
          HOME
        </div>

        {/* Score display */}
        <div
          style={{
            textAlign: "center",
            fontSize: "4rem",
            marginBottom: "1rem",
          }}
        >
          {state.homeScore}
        </div>

        {/* Score buttons */}
        <div style={{ display: "grid", gap: "0.5rem" }}>
          <button onClick={() => dispatch({ type: "INCREMENT_HOME", amount: 3 })}>+3</button>
          <button onClick={() => dispatch({ type: "INCREMENT_HOME", amount: 2 })}>+2</button>
          <button onClick={() => dispatch({ type: "INCREMENT_HOME", amount: 1 })}>+1</button>
          <button onClick={() => dispatch({ type: "DECREMENT_HOME", amount: 1 })}>-1</button>
        </div>
      </div>

      {/* ================= CENTER COLUMN ================= */}
      <div
        style={{
          flex: 1.2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* -------- GAME CLOCK SECTION -------- */}
        <div>
          <div
            style={{
              textAlign: "center",
              fontSize: "1rem",
              letterSpacing: "2px",
              marginBottom: "0.5rem",
            }}
          >
            GAME
          </div>

          <div
            style={{
              textAlign: "center",
              fontSize: "2.8rem",
              marginBottom: "0.5rem",
            }}
          >
            {formatGameTime(state.gameClock)}
          </div>

          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
            <button
              onClick={() =>
                dispatch({
                  type: state.isGameRunning ? "STOP_GAME" : "START_GAME",
                })
              }
            >
              {state.isGameRunning ? "Stop" : "Start"}
            </button>

            <button
              onClick={() => {
                const input = prompt("Set game time in seconds:");
                if (!input) return;
                const seconds = parseFloat(input);
                if (isNaN(seconds) || seconds < 0) return;
                dispatch({ type: "SET_GAME_TIME", seconds });
              }}
            >
              Set Time
            </button>
          </div>
        </div>

        {/* -------- SHOT CLOCK SECTION -------- */}
        <div>
          <div
            style={{
              textAlign: "center",
              fontSize: "1rem",
              letterSpacing: "2px",
              marginBottom: "0.5rem",
              marginTop: "1.5rem",
            }}
          >
            SHOT
          </div>

          <div
            style={{
              textAlign: "center",
              fontSize: "2.4rem",
              marginBottom: "0.5rem",
            }}
          >
            {state.shotClock.toFixed(1)}
          </div>

          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
            <button
              onClick={() =>
                dispatch({
                  type: state.isShotClockRunning
                    ? "STOP_SHOT_CLOCK"
                    : "START_SHOT_CLOCK",
                })
              }
            >
              {state.isShotClockRunning ? "Stop" : "Start"}
            </button>

            <button onClick={() => dispatch({ type: "SET_SHOT_CLOCK", seconds: 24 })}>
              24
            </button>

            <button onClick={() => dispatch({ type: "SET_SHOT_CLOCK", seconds: 14 })}>
              14
            </button>
          </div>
        </div>
      </div>

      {/* ================= AWAY COLUMN ================= */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div
          style={{
            textAlign: "center",
            fontSize: "1rem",
            marginBottom: "0.5rem",
            letterSpacing: "2px",
          }}
        >
          AWAY
        </div>

        <div
          style={{
            textAlign: "center",
            fontSize: "4rem",
            marginBottom: "1rem",
          }}
        >
          {state.awayScore}
        </div>

        <div style={{ display: "grid", gap: "0.5rem" }}>
          <button onClick={() => dispatch({ type: "INCREMENT_AWAY", amount: 3 })}>+3</button>
          <button onClick={() => dispatch({ type: "INCREMENT_AWAY", amount: 2 })}>+2</button>
          <button onClick={() => dispatch({ type: "INCREMENT_AWAY", amount: 1 })}>+1</button>
          <button onClick={() => dispatch({ type: "DECREMENT_AWAY", amount: 1 })}>-1</button>
        </div>
      </div>
    </div>
  );
}

export default App;