// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Appointments from "./Pages/Appointments";
import Patients from "./Pages/Patients";
import Doctors from "./Pages/Doctors";
import Pharmacy from "./Pages/Pharmacy";
import Billing from "./Pages/Billing";
import Login from "./Auth/Login";
import Layout from "../components/Layout";
import Settings from "./Pages/Settings";
import NotFound from "./Pages/NotFound";
import { AuthProvider } from "./contexts/AuthProvider";

import ProtectedRoute from "../components/ProtectedRoute";
import RoleProtectedRoute from "../components/RoleProtectedRoute";

function AppRoutes() {
 
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <Outlet />
            </Layout>
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="patients" element={<Patients />} />

        <Route
          path="doctors"
          element={
            <RoleProtectedRoute roles={["ADMIN", "HOSPITAL_ADMIN"]}>
              <Doctors />
            </RoleProtectedRoute>
          }
        />

        <Route path="pharmacy" element={<Pharmacy />} />
        <Route path="billing" element={<Billing />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
