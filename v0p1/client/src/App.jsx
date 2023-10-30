import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { routeKeys } from "./constants/routes";
import { roles } from "./constants/enum";
import {
  LoginPage,
  EmployeeListPage,
  ProfilePage,
  PersonalDetailPage,
  RecruitmentPage,
  Catelogue,
  LeavePage,
  PerformancePage,
  SettingPage,
  DashboardPage,
} from "./pages";
import { PublicRoute, AdminRoute } from "./routes";

import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <>
      <Routes>
        {/* Authentication */}
        <Route path={"/"} element={<LoginPage />} />
        <Route path={routeKeys.LOGIN} element={<LoginPage />} />

        {/* public route */}
        <Route
          path={routeKeys.EMPLOYEE_PROFILE}
          element={
            <PublicRoute>
              <ProfilePage />
            </PublicRoute>
          }
        />

        <Route
          path={routeKeys.PERSONAL_DETAILS}
          element={
            <PublicRoute>
              <PersonalDetailPage />
            </PublicRoute>
          }
        />
        <Route
          path={routeKeys.RECRUITMENT}
          element={
            <PublicRoute>
              <RecruitmentPage />
            </PublicRoute>
          }
        />
        <Route
          path={routeKeys.CATALOGUE}
          element={
            <PublicRoute>
              <Catelogue />
            </PublicRoute>
          }
        />
        <Route
          path={routeKeys.LEAVE}
          element={
            <PublicRoute>
              <LeavePage />
            </PublicRoute>
          }
        />
        <Route
          path={routeKeys.PERFORMANCE}
          element={
            <PublicRoute>
              <PerformancePage />
            </PublicRoute>
          }
        />

        <Route
          path={routeKeys.SYSTEM_USERS}
          element={
            <PublicRoute>
              <SettingPage />
            </PublicRoute>
          }
        />

        <Route
          path={routeKeys.DASHBOARD}
          element={
            <PublicRoute>
              <DashboardPage />
            </PublicRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path={routeKeys.EMPLOYEES}
          element={
            <AdminRoute roleAllowed={[roles.ADMIN]}>
              <EmployeeListPage />
            </AdminRoute>
          }
        />
      </Routes>

      <ToastContainer 
      
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
    </>
  );
}

export default App;
