import { useCallback, useEffect, useRef } from "react";

import "./App.css";
import buzzerSound from "./assets/buzzer.mp3";
import { useGame } from "./context/useGame";
import { useGameTimer } from "./hooks/useGameTimer";
import { useWakeLock } from "./hooks/useWakeLock";
import { formatGameTime } from "./utils/formatTime";
import { formatShotClock } from "./utils/formatTime";

function App() {
  useGameTimer();
  useWakeLock();
  const { state, dispatch } = useGame();

  const gameColor = state.isGameRunning ? "white" : "red";
  const shotColor = state.isShotClockRunning ? "#0f5f0f" : "red";

  // Keep one audio element for the lifetime of the component.
  // Reusing it lets the sound-test button and clock events play the same audio.
  const buzzerRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const buzzer = new Audio(buzzerSound);
    buzzerRef.current = buzzer;

    return () => {
      // Stop playback when the component unmounts.
      // This also cleans up React Strict Mode's development-only setup cycle.
      buzzer.pause();
      buzzerRef.current = null;
    };
  }, []);

  const playBuzzer = useCallback(async () => {
    const buzzer = buzzerRef.current;
    if (!buzzer) return;

    try {
      // Always play from the beginning, including when a previous buzzer
      // is still playing.
      buzzer.currentTime = 0;
      await buzzer.play();
    } catch (error) {
      // Browsers can reject playback, for example because user interaction
      // is required or the audio file could not be loaded.
      // Catch the rejection so it does not become an unhandled promise.
      console.warn("Buzzer playback failed:", error);
    }
  }, []);

  // Start with the current values so loading the app with a clock at zero
  // does not trigger a buzzer.
  const prevGameClock = useRef(state.gameClock);
  const prevShotClock = useRef(state.shotClock);

  useEffect(() => {
    // Detect the transition from positive time to zero.
    // Later renders with the clock still at zero must not sound again.
    const gameExpired =
      prevGameClock.current > 0 && state.gameClock === 0;
    const shotExpired =
      prevShotClock.current > 0 && state.shotClock === 0;

    prevGameClock.current = state.gameClock;
    prevShotClock.current = state.shotClock;

    // Handle both clocks together so simultaneous expiration plays once.
    if (gameExpired || shotExpired) {
      void playBuzzer();
    }
  }, [state.gameClock, state.shotClock, playBuzzer]);

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
        <div className="section-title">HOME</div>

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
          <div className="section-title">GAME</div>

          <div
            className="game-clock"
            style={{ margin: "0.5rem 0", color: gameColor }}
          >
            {formatGameTime(state.gameClock)}
          </div>

          <div className="game-controls">
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
                /**
                 * Ask user for time in mm:ss format
                 * Example inputs:
                 * 10:00
                 * 8:30
                 * 1:45
                 */
                const input = prompt("Enter time (mm:ss):");

                if (!input) return;

                /**
                 * Validate format using regex:
                 * - 1 or more digits for minutes
                 * - exactly 2 digits for seconds
                 */
                const match = input.trim().match(/^(\d+):([0-5]\d)$/);

                if (!match) {
                  alert(
                    "Invalid format. Please use mm:ss (e.g., 10:00 or 8:30)",
                  );
                  return;
                }

                const minutes = parseInt(match[1], 10);
                const seconds = parseInt(match[2], 10);

                /**
                 * Convert mm:ss to total seconds
                 */
                const totalSeconds = minutes * 60 + seconds;

                dispatch({ type: "SET_GAME_TIME", seconds: totalSeconds });
              }}
            >
              Set Time
            </button>
            {/* Play directly from a user interaction so the operator can check
                sound and volume before starting the game. */}
            <button onClick={() => void playBuzzer()}>
              Test sound
            </button>
          </div>
        </div>

        {/* -------- SPACING BETWEEN GAME & SHOT -------- */}

        {/* -------- SHOT SECTION -------- */}
        <div style={{ textAlign: "center" }}>
          <div className="section-title">SHOT</div>

          <div
            className="shot-clock"
            style={{ margin: "0.5rem 0", color: shotColor }}
          >
            {formatShotClock(state.shotClock)}
          </div>
          {/**
           * Start / Stop shot clock toggle
           */}
          <div className="shot-controls">
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

            <button
              onClick={() => dispatch({ type: "SET_SHOT_CLOCK", seconds: 24 })}
            >
              24s
            </button>

            <button
              onClick={() => dispatch({ type: "SET_SHOT_CLOCK", seconds: 14 })}
            >
              14s
            </button>
          </div>

          <button
            className="danger"
            onClick={() => {
              // Guard against accidental taps during a game
              if (confirm("Reset the score to 0:0?")) {
                dispatch({ type: "RESET_SCORE" });
              }
            }}
          >
            RESET SCORE
          </button>
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
        <div className="section-title">AWAY</div>

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
