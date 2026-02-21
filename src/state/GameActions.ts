export type GameAction =
  | { type: "INCREMENT_HOME"; amount: number }
  | { type: "INCREMENT_AWAY"; amount: number }
  | { type: "DECREMENT_HOME"; amount: number }
  | { type: "DECREMENT_AWAY"; amount: number }
  | { type: "START_GAME" }
  | { type: "STOP_GAME" }
  | { type: "RESET_GAME" }
  | { type: "TICK" }
  | { type: "RESET_SHOT_CLOCK" }
  | { type: "SET_SHOT_CLOCK"; seconds: number };
