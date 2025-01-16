import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MinimartContextProvider } from "./context/MinimartContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MinimartContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MinimartContextProvider>
  </StrictMode>
);
