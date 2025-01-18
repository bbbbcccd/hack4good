import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Auth context providers
import { AuthContextProvider } from "./context/auth/AuthContext.jsx";

// Common context providers
import { MinimartContextProvider } from "./context/MinimartContext.jsx";
import { VoucherTaskContextProvider } from "./context/VoucherTaskContext.jsx";
import { VoucherTaskCompletionContextProvider } from "./context/VoucherTaskCompletionContext.jsx";

// Admin context providers
import { UsersContextProvider } from "./context/admin/UsersContext.jsx";
import { AdminsContextProvider } from "./context/admin/AdminsContext.jsx";

// User context providers
import { TransactionContextProvider } from "./context/users/TransactionContext.jsx";
import { UserDetailsContextProvider } from "./context/users/UserDetailsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <MinimartContextProvider>
        <VoucherTaskContextProvider>
          <VoucherTaskCompletionContextProvider>
            <UsersContextProvider>
              <AdminsContextProvider>
                <TransactionContextProvider>
                  <UserDetailsContextProvider>
                    <App />
                  </UserDetailsContextProvider>
                </TransactionContextProvider>
              </AdminsContextProvider>
            </UsersContextProvider>
          </VoucherTaskCompletionContextProvider>
        </VoucherTaskContextProvider>
      </MinimartContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
