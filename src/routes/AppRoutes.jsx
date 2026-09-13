import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import VerifyOtp from "../pages/VerifyOtp";

import ProtectedRoute from "../components/auth/ProtectedRoute";

import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/Dashboard";
import Groups from "../pages/Groups";
import Contributions from "../pages/Contributions";
import Transactions from "../pages/Transactions";
import Profile from "../pages/Profile";
import CreateGroup from "../pages/CreateGroup";
import GroupDetails from "../pages/GroupDetails";
import ContributionCycleDetails from "../pages/ContributionCycleDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/contributions" element={<Contributions />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/groups/create" element={<CreateGroup />} />
        <Route path="/groups/:groupId" element={<GroupDetails />} />
        <Route
          path="/groups/:groupId/cycles/:cycleId"
          element={<ContributionCycleDetails />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
