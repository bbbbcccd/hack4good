import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import { MinimartContextProvider } from "./context/MinimartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <MinimartContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MinimartContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
