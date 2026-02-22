import { useEffect, useRef } from "react";

import "./App.css";
import buzzerSound from "./assets/buzzer.mp3";
import { useGame } from "./context/useGame";
import { useGameTimer } from "./hooks/useGameTimer";
import { formatGameTime } from "./utils/formatTime";
import { formatShotClock } from "./utils/formatTime";

function App() {
  useGameTimer();
  const { state, dispatch } = useGame();

  const gameColor = state.isGameRunning ? "white" : "red";
  const shotColor = state.isShotClockRunning ? "#0f5f0f" : "red";

  // 🔊 ---- BUZZER SETUP ----
  const buzzerRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    buzzerRef.current = new Audio(buzzerSound);
  }, []);

  const prevGameClock = useRef(state.gameClock);
  const prevShotClock = useRef(state.shotClock);

  useEffect(() => {
    if (prevGameClock.current > 0 && state.gameClock === 0) {
      buzzerRef.current?.play();
    }
    prevGameClock.current = state.gameClock;
  }, [state.gameClock]);

  useEffect(() => {
    if (prevShotClock.current > 0 && state.shotClock === 0) {
      buzzerRef.current?.play();
    }
    prevShotClock.current = state.shotClock;
  }, [state.shotClock]);

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
      <div className="center-column">
        {/* -------- GAME SECTION -------- */}
        <div style={{ textAlign: "center" }}>
          <div style={{ letterSpacing: "2px" }}>GAME</div>

          <div
            style={{
              fontSize: "2.6rem",
              margin: "0.5rem 0",

              /* 👇 Dynamic color */
              color: gameColor,
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

        {/* -------- SHOT SECTION -------- */}
        <div style={{ textAlign: "center" }}>
          <div style={{ letterSpacing: "2px" }}>SHOT</div>

          <div
            style={{
              fontSize: "2.2rem",
              margin: "0.5rem 0",

              /* 👇 Dynamic color */
              color: shotColor,
            }}
          >
            {formatShotClock(state.shotClock)}
          </div>
          {/**
           * Start / Stop shot clock toggle
           */}
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

            {/**
             * Horizontal row containing quick shot clock resets.
             * This row is ONLY for 24s and 14s.
             */}
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

            {/**
             * Reset score button.
             * Important: This is OUTSIDE the horizontal row,
             * so it stacks vertically below it.
             */}
            <button
              style={{
                backgroundColor: "#8b0000",
                color: "white",
                fontWeight: "bold",
              }}
              onClick={() => dispatch({ type: "RESET_SCORE" })}
            >
              RESET SCORE
            </button>
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
