export interface GameState {
  homeScore: number;
  awayScore: number;

  gameClock: number;
  shotClock: number;

  isGameRunning: boolean;
  isShotClockRunning: boolean;
}

export const createInitialGameState = (): GameState => ({
  homeScore: 0,
  awayScore: 0,

  gameClock: 10 * 60,
  shotClock: 24,

  isGameRunning: false,
  isShotClockRunning: false,
});
