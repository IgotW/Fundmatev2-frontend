import { useEffect, useMemo, useState } from "react";
import { CalendarClock, Users, Wallet } from "lucide-react";
import { getMyGroups } from "../api/auth.api.js";
import { useAuth } from "../hooks/useAuth.jsx";
import StatCard from "../components/dashboard/StatCard.jsx";
import GroupsQuickAccess from "../components/dashboard/GroupsQuickAccess.jsx";
import UpcomingContributions from "../components/dashboard/UpcomingContributions.jsx";

const peso = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", minimumFractionDigits: 2 });

const Dashboard = () => {
  const { token } = useAuth();
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    const loadDashboard = async () => {
      try {
        const response = await getMyGroups(token);
        setGroups((response.data || []).map(({ group, role }) => ({
          id: group._id, name: group.name, role, members: group.membersCount || 0,
          contribution: Number(group.contributionAmount || 0), nextDueDate: group.nextDueDate,
          progress: group.progress || 0,
        })));
      } catch (loadError) {
        setError(loadError.message || "We could not load your fund overview.");
      } finally {
        setIsLoading(false);
      }
    };
    loadDashboard();
  }, [token]);

  const scheduledPerCycle = useMemo(() => groups.reduce((total, group) => total + group.contribution, 0), [groups]);
  const contributions = groups.filter((group) => group.nextDueDate).map((group) => ({
    id: group.id, groupName: group.name, amount: peso.format(group.contribution),
    dueDate: group.nextDueDate, status: "Upcoming",
  }));

  return (
    <div>
      <section className="fm-rise">
        <p className="text-sm font-medium text-muted">Member overview</p>
        <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">Your financial workspace</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">See every group, upcoming due date, and shared savings commitment in one calm, clear view.</p>
      </section>
      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Scheduled per cycle" value={peso.format(scheduledPerCycle)} description="Across your active groups" icon={Wallet} />
        <StatCard label="Active groups" value={String(groups.length)} description="Groups you belong to" icon={Users} />
        <StatCard label="Upcoming payments" value={String(contributions.length)} description="Contribution cycles ahead" icon={CalendarClock} />
      </section>
      {error && <p className="mt-6 rounded-2xl border border-danger-text/20 bg-danger-bg px-4 py-3 text-sm text-danger-text">{error}</p>}
      <section className="mt-10"><GroupsQuickAccess groups={groups} isLoading={isLoading} /></section>
      <section className="mt-6"><UpcomingContributions contributions={contributions} /></section>
    </div>
  );
};

export default Dashboard;
