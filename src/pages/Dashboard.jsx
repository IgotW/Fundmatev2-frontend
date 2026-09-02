import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

import StatCard from "../components/dashboard/StatCard.jsx";
import { Wallet, Users, CalendarClock } from "lucide-react";
import ContributionProgress from "../components/dashboard/ContributionProgress.jsx";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-paper p-10">
      <h1 className="font-display text-4xl text-ink">
        Welcome to FundMate Dashboard
      </h1>

      <p className="mt-4 text-muted">You are successfully logged in.</p>

      {user && (
        <div className="mt-6">
          <p className="text-ink">Welcome, {user.name}</p>

          <p className="text-muted">{user.email}</p>
        </div>
      )}

      {/* Financial Summary */}
      <section className="mt-10">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            label="Total Contributions"
            value="₱12,500.00"
            description="Across all your groups"
            icon={Wallet}
          />

          <StatCard
            label="Active Groups"
            value="3"
            description="Groups you're currently part of"
            icon={Users}
          />

          <StatCard
            label="Next Payment"
            value="Sep 10"
            description="Due in 8 days"
            icon={CalendarClock}
          />
        </div>
      </section>
      {/* Dashboard Content */}
      <section className="mt-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <ContributionProgress />

          {/* Recent Activity will go here */}
          <div className="rounded-2xl border border-line bg-white/60 p-5 sm:p-6">
            <p className="text-sm font-medium text-muted">Recent activity</p>

            <h2 className="mt-1 font-display text-2xl text-ink">
              Your latest activity
            </h2>

            <p className="mt-4 text-sm text-muted">
              Recent contribution activity will appear here.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
