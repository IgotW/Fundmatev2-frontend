import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import GroupQuickAccessCard from "./GroupQuickAccessCard.jsx";

const groups = [
  {
    id: "1",
    name: "Monthly Savings Group",
    role: "admin",
    members: 8,
    progress: 75,
  },
  {
    id: "2",
    name: "Emergency Fund Circle",
    role: "member",
    members: 12,
    progress: 50,
  },
  {
    id: "3",
    name: "Weekend Savings Circle",
    role: "member",
    members: 6,
    progress: 90,
  },
];

const GroupsQuickAccess = () => {
  return (
    <section>
      {/* Section Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted">Quick access</p>

          <h2 className="mt-1 font-display text-2xl text-ink">Your groups</h2>

          <p className="mt-2 text-sm leading-6 text-muted">
            Quickly access and manage your group funds.
          </p>
        </div>

        <Link
          to="/groups"
          className="flex shrink-0 items-center gap-1 text-sm font-medium text-primary transition hover:text-primary-light"
        >
          View all
          <ArrowRight size={16} strokeWidth={1.8} />
        </Link>
      </div>

      {/* Group Cards */}
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {groups.map((group) => (
          <GroupQuickAccessCard
            key={group.id}
            id={group.id}
            name={group.name}
            role={group.role}
            members={group.members}
            progress={group.progress}
          />
        ))}
      </div>
    </section>
  );
};

export default GroupsQuickAccess;
