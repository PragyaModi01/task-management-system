import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Workspaces from "../pages/Workspaces";
import Projects from "../pages/Projects";
import SprintBoard from "../pages/SprintBoard";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import Tasks from "../pages/Tasks";

const AppRoutes = () => {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />

        <Route path="/workspaces" element={<Workspaces />} />

        <Route path="/projects" element={<Projects />} />

        <Route path="/sprints" element={<SprintBoard />} />

        <Route path="/tasks" element={<Tasks />} />
      </Route>

      <Route
        path="*"
        element={
          token ? <Navigate to="/" replace /> : <Navigate to="/login" replace />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
