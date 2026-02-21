// Import custom hook to access state + dispatch
import { useGame } from "./context/GameContext";

function App() {
  // Extract state and dispatch from context
  const { state, dispatch } = useGame();

  return (
    <div>
      <h1>Basketball Scoreboard</h1>

      {/* Display current home score */}
      <p>Home: {state.homeScore}</p>

      {/* Dispatch action to increment home score */}
      <button
        onClick={() =>
          dispatch({ type: "INCREMENT_HOME", amount: 1 })
        }
      >
        +1 Home
      </button>
    </div>
  );
}

export default App;
