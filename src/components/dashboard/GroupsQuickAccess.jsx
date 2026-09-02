import { ArrowRight, Users, Plus, UserPlus } from "lucide-react";
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

        {groups.length > 3 && (
          <Link
            to="/groups"
            className="flex shrink-0 items-center gap-1 text-sm font-medium text-primary transition hover:text-primary-light"
          >
            View all
            <ArrowRight size={16} strokeWidth={1.8} />
          </Link>
        )}
      </div>

      {/* Groups or Empty State */}
      {groups.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-line bg-white/40 px-6 py-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Users size={22} strokeWidth={1.8} />
          </div>

          <h3 className="mt-4 font-display text-xl text-ink">No groups yet</h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
            You haven't joined or created a group yet. Create a group or join
            one to start managing funds together.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/groups/create"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-primary-light"
            >
              <Plus size={18} strokeWidth={1.8} />
              Create a Group
            </Link>

            <Link
              to="/groups/join"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white/60 px-5 py-3 text-sm font-medium text-ink transition hover:border-primary/30 hover:bg-white"
            >
              <UserPlus size={18} strokeWidth={1.8} />
              Join a Group
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {groups.slice(0, 3).map((group) => (
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
      )}
    </section>
  );
};

export default GroupsQuickAccess;
