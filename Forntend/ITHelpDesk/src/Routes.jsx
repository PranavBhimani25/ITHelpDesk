import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { RoleProvider } from "./components/ui/RoleBasedNav.jsx";
import { NotificationProvider } from "./components/ui/NotificationBadge";
import NotFound from "./pages/NotFound.jsx";
import LoginPage from './pages/login';
import UserManagement from './pages/user-management';
import Dashboard from './pages/dashboard';
import TicketManagement from './pages/ticket-management';
import TicketDetail from './pages/ticket-detail';
import CreateTicket from './pages/create-ticket';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <RoleProvider initialRole="agent">
          <NotificationProvider>
            <ScrollToTop />
            <RouterRoutes>
              {/* Define your route here */}
              <Route path="/" element={<CreateTicket />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/ticket-management" element={<TicketManagement />} />
              <Route path="/ticket-detail" element={<TicketDetail />} />
              <Route path="/create-ticket" element={<CreateTicket />} />
              <Route path="*" element={<NotFound />} />
            </RouterRoutes>
          </NotificationProvider>
        </RoleProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;