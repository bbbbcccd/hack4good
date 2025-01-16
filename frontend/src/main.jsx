import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./contexts/AuthContext.jsxx";
import { MinimartContextProvider } from "./context/MinimartContext.jsx";
import { TransactionContextProvider } from "./context/users/TransactionContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <TransactionContextProvider>
        <MinimartContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MinimartContextProvider>
      </TransactionContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
