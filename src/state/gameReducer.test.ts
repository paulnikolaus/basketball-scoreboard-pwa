import { describe, expect, it } from "vitest";
import { createInitialGameState } from "./GameState";
import { gameReducer } from "./gameReducer";

describe("gameReducer", () => {
  it("adds points without changing the previous state", () => {
    const state = Object.freeze(createInitialGameState());

    const result = gameReducer(state, {
      type: "INCREMENT_HOME",
      amount: 3,
    });

    expect(result).toEqual({ ...state, homeScore: 3 });
    expect(state.homeScore).toBe(0);
  });

  it("keeps scores at zero when subtracting too many points", () => {
    const state = { ...createInitialGameState(), awayScore: 1 };

    const result = gameReducer(state, {
      type: "DECREMENT_AWAY",
      amount: 3,
    });

    expect(result).toEqual({ ...state, awayScore: 0 });
  });

  it("stops both clocks at period end, even after a delayed tick", () => {
    const state = {
      ...createInitialGameState(),
      gameClock: 1,
      shotClock: 10,
      isGameRunning: true,
      isShotClockRunning: true,
    };

    // Only one second of the delayed tick belongs to this period.
    const result = gameReducer(state, { type: "TICK", elapsed: 5 });

    expect(result).toEqual({
      ...state,
      gameClock: 0,
      shotClock: 9,
      isGameRunning: false,
      isShotClockRunning: false,
    });
  });

  it("keeps game time running when only the shot clock expires", () => {
    const state = {
      ...createInitialGameState(),
      gameClock: 60,
      shotClock: 1,
      isGameRunning: true,
      isShotClockRunning: true,
    };

    const result = gameReducer(state, { type: "TICK", elapsed: 1 });

    expect(result).toEqual({
      ...state,
      gameClock: 59,
      shotClock: 0,
      isShotClockRunning: false,
    });
  });
});
