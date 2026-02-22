import { useGame } from "./context/useGame";
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
        alignItems: "stretch", // explicitly stretch children
        backgroundColor: "#111",
        color: "white",
        fontFamily: "system-ui",
        padding: "0.8rem",
        gap: "1.2rem",
      }}
    >
      {/* ================= HOME COLUMN ================= */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%", // critical
        }}
      >
        <div style={{ textAlign: "center", letterSpacing: "2px" }}>HOME</div>

        <div
          style={{
            textAlign: "center",
            fontSize: "3rem",
            margin: "0.5rem 0",
          }}
        >
          {state.homeScore}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
            flex: 1, // consume remaining height
          }}
        >
          <button
            onClick={() => dispatch({ type: "INCREMENT_HOME", amount: 3 })}
          >
            +3
          </button>
          <button
            onClick={() => dispatch({ type: "INCREMENT_HOME", amount: 2 })}
          >
            +2
          </button>
          <button
            onClick={() => dispatch({ type: "INCREMENT_HOME", amount: 1 })}
          >
            +1
          </button>
          <button
            onClick={() => dispatch({ type: "DECREMENT_HOME", amount: 1 })}
          >
            -1
          </button>
        </div>
      </div>

      {/* ================= CENTER COLUMN ================= */}
      <div
        style={{
          flex: 1.2,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          gap: "2rem",
        }}
      >
        {/* -------- GAME SECTION -------- */}
        <div style={{ textAlign: "center" }}>
          <div style={{ letterSpacing: "2px" }}>GAME</div>

          <div
            style={{
              fontSize: "2.6rem",
              margin: "0.5rem 0",
            }}
          >
            {formatGameTime(state.gameClock)}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
            }}
          >
            <button
              onClick={() =>
                dispatch({
                  type: state.isGameRunning ? "STOP_GAME" : "START_GAME",
                })
              }
            >
              Start / Stop
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

        {/* -------- SPACING BETWEEN GAME & SHOT -------- */}
        <div style={{ height: "2rem" }} />

        {/* -------- SHOT SECTION -------- */}
        <div style={{ textAlign: "center" }}>
          <div style={{ letterSpacing: "2px" }}>SHOT</div>

          <div
            style={{
              fontSize: "2.2rem",
              margin: "0.5rem 0",
            }}
          >
            {state.shotClock.toFixed(1)}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
            }}
          >
            <button
              onClick={() =>
                dispatch({
                  type: state.isShotClockRunning
                    ? "STOP_SHOT_CLOCK"
                    : "START_SHOT_CLOCK",
                })
              }
            >
              Start / Stop
            </button>

            <div style={{ display: "flex", gap: "0.6rem" }}>
              <button
                style={{ flex: 1 }}
                onClick={() =>
                  dispatch({ type: "SET_SHOT_CLOCK", seconds: 24 })
                }
              >
                24s
              </button>

              <button
                style={{ flex: 1 }}
                onClick={() =>
                  dispatch({ type: "SET_SHOT_CLOCK", seconds: 14 })
                }
              >
                14s
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= AWAY COLUMN ================= */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%", // critical
        }}
      >
        <div style={{ textAlign: "center", letterSpacing: "2px" }}>AWAY</div>

        <div
          style={{
            textAlign: "center",
            fontSize: "3rem",
            margin: "0.5rem 0",
          }}
        >
          {state.awayScore}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
            flex: 1, // consume remaining height
          }}
        >
          <button
            onClick={() => dispatch({ type: "INCREMENT_AWAY", amount: 3 })}
          >
            +3
          </button>
          <button
            onClick={() => dispatch({ type: "INCREMENT_AWAY", amount: 2 })}
          >
            +2
          </button>
          <button
            onClick={() => dispatch({ type: "INCREMENT_AWAY", amount: 1 })}
          >
            +1
          </button>
          <button
            onClick={() => dispatch({ type: "DECREMENT_AWAY", amount: 1 })}
          >
            -1
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
