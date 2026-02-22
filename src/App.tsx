import { useGame } from "./context/GameContext";
import { useGameTimer } from "./hooks/useGameTimer";
import { formatGameTime } from "./utils/formatTime";

function App() {
  useGameTimer();
  const { state, dispatch } = useGame();

  const buttonStyle = {
    padding: "0.7rem",
    fontSize: "1rem",
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        backgroundColor: "#111",
        color: "white",
        fontFamily: "system-ui",
        padding: "0.8rem",
        gap: "0.8rem",
      }}
    >
      {/* ================= HOME COLUMN ================= */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ textAlign: "center", letterSpacing: "2px" }}>HOME</div>

        <div
          style={{
            textAlign: "center",
            fontSize: "4rem",
            margin: "0.5rem 0 1rem 0",
          }}
        >
          {state.homeScore}
        </div>

        <div style={{ display: "grid", gap: "0.6rem" }}>
          <button
            style={buttonStyle}
            onClick={() => dispatch({ type: "INCREMENT_HOME", amount: 3 })}
          >
            +3
          </button>
          <button
            style={buttonStyle}
            onClick={() => dispatch({ type: "INCREMENT_HOME", amount: 2 })}
          >
            +2
          </button>
          <button
            style={buttonStyle}
            onClick={() => dispatch({ type: "INCREMENT_HOME", amount: 1 })}
          >
            +1
          </button>
          <button
            style={buttonStyle}
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
          alignItems: "center",
        }}
      >
        {/* -------- GAME CLOCK -------- */}
        <div style={{ textAlign: "center", width: "100%" }}>
          <div style={{ letterSpacing: "2px" }}>GAME</div>

          <div style={{ fontSize: "2.8rem", margin: "0.5rem 0" }}>
            {formatGameTime(state.gameClock)}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
              marginBottom: "1.5rem",
            }}
          >
            <button
              style={buttonStyle}
              onClick={() =>
                dispatch({
                  type: state.isGameRunning ? "STOP_GAME" : "START_GAME",
                })
              }
            >
              Start / Stop
            </button>

            <button
              style={buttonStyle}
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

        {/* -------- SHOT CLOCK -------- */}
        <div style={{ textAlign: "center", width: "100%" }}>
          <div style={{ letterSpacing: "2px" }}>SHOT</div>

          <div style={{ fontSize: "2.4rem", margin: "0.5rem 0" }}>
            {state.shotClock.toFixed(1)}
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}
          >
            <button
              style={buttonStyle}
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
                style={{ ...buttonStyle, flex: 1 }}
                onClick={() =>
                  dispatch({ type: "SET_SHOT_CLOCK", seconds: 24 })
                }
              >
                24s
              </button>

              <button
                style={{ ...buttonStyle, flex: 1 }}
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
        }}
      >
        <div style={{ textAlign: "center", letterSpacing: "2px" }}>AWAY</div>

        <div
          style={{
            textAlign: "center",
            fontSize: "4rem",
            margin: "0.5rem 0 1rem 0",
          }}
        >
          {state.awayScore}
        </div>

        <div style={{ display: "grid", gap: "0.6rem" }}>
          <button
            style={buttonStyle}
            onClick={() => dispatch({ type: "INCREMENT_AWAY", amount: 3 })}
          >
            +3
          </button>
          <button
            style={buttonStyle}
            onClick={() => dispatch({ type: "INCREMENT_AWAY", amount: 2 })}
          >
            +2
          </button>
          <button
            style={buttonStyle}
            onClick={() => dispatch({ type: "INCREMENT_AWAY", amount: 1 })}
          >
            +1
          </button>
          <button
            style={buttonStyle}
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
