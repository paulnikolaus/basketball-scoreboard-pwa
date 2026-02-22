// React DOM renderer
import React from "react";
import ReactDOM from "react-dom/client";

// 👇 Import global styles ONCE here
import "./index.css";

// Root App component
import App from "./App";

// Context provider
import { GameProvider } from "./context/GameProvider";

/**
 * Render the entire application
 * wrapped inside GameProvider
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <GameProvider>
            <App />
        </GameProvider>
    </React.StrictMode>,
);