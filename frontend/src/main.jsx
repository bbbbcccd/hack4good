import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthContextProvider } from './context/auth/AuthContext.jsx';
import { MinimartContextProvider } from './context/MinimartContext.jsx';
import { VoucherTaskContextProvider } from './context/VoucherTaskContext.jsx';
import { TransactionContextProvider } from './context/users/TransactionContext.jsx';
import { UsersContextProvider } from './context/admin/UsersContext.jsx';
import { AdminsContextProvider } from './context/admin/AdminsContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <TransactionContextProvider>
        <MinimartContextProvider>
          <VoucherTaskContextProvider>
            <UsersContextProvider>
              <AdminsContextProvider>
                <App />
              </AdminsContextProvider>
            </UsersContextProvider>
          </VoucherTaskContextProvider>
        </MinimartContextProvider>
      </TransactionContextProvider>
    </AuthContextProvider>
  </StrictMode>,
);
