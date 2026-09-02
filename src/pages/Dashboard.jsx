import StatCard from "../components/dashboard/StatCard.jsx";
import { Wallet, Users, CalendarClock } from "lucide-react";

import ContributionProgress from "../components/dashboard/ContributionProgress.jsx";
import RecentActivity from "../components/dashboard/RecentActivity.jsx";
import UpcomingContributions from "../components/dashboard/UpcomingContributions.jsx";
import GroupsQuickAccess from "../components/dashboard/GroupsQuickAccess.jsx";

const Dashboard = () => {
  return (
    <div>
      {/* Dashboard Introduction */}
      <section>
        <p className="text-sm font-medium text-muted">Overview</p>

        <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
          Your financial workspace
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">
          Keep track of your groups, contributions, and upcoming payments in one
          place.
        </p>
      </section>

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

      {/* Quick Access to Groups */}
      <section className="mt-10">
        <GroupsQuickAccess />
      </section>

      {/* Main Dashboard Content */}
      <section className="mt-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <ContributionProgress />

          <RecentActivity />
        </div>
      </section>

      {/* Upcoming Contributions */}
      <section className="mt-6">
        <UpcomingContributions />
      </section>
    </div>
  );
};

export default Dashboard;
