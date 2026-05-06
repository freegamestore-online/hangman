import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initQualityReporter } from "@freeappstore/quality";
import "./index.css";
import App from "./App";

// Cooperate with the platform Quality Dashboard. No-op when not iframed.
initQualityReporter();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
