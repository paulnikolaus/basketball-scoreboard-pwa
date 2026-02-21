// React entry point imports
import React from "react";
import ReactDOM from "react-dom/client";

// Main application component
import App from "./App";

// Import our GameProvider to wrap the entire app
import { GameProvider } from "./context/GameContext";

/**
 * Create the root React rendering tree.
 * We wrap App inside GameProvider so that
 * every component has access to game state.
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>
);
