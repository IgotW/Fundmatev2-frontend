import { Plus, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import GroupCard from "../components/groups/GroupCard.jsx";

const groups = [
  {
    id: "1",
    name: "Monthly Savings Group",
    role: "admin",
    members: 8,
    contribution: "₱500.00",
    nextDueDate: "Sep 10",
    progress: 75,
  },
  {
    id: "2",
    name: "Emergency Fund Circle",
    role: "member",
    members: 12,
    contribution: "₱1,000.00",
    nextDueDate: "Sep 15",
    progress: 50,
  },
  {
    id: "3",
    name: "Weekend Savings Circle",
    role: "member",
    members: 6,
    contribution: "₱300.00",
    nextDueDate: "Sep 20",
    progress: 90,
  },
];

const Groups = () => {
  const [filter, setFilter] = useState("all");

  const filteredGroups =
    filter === "all" ? groups : groups.filter((group) => group.role === filter);

  return (
    <div>
      {/* Page Header */}
      <section>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-muted">Group management</p>

            <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
              My Groups
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">
              Manage the groups you belong to and keep track of your shared
              funds.
            </p>
          </div>

          <Link
            to="/groups/create"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-primary-light sm:w-auto"
          >
            <Plus size={18} strokeWidth={1.8} />
            Create Group
          </Link>
        </div>
      </section>

      <section className="mt-8">
        <div className="flex flex-wrap gap-2">
          {[
            { value: "all", label: "All Groups" },
            { value: "admin", label: "Admin" },
            { value: "member", label: "Member" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                filter === option.value
                  ? "bg-primary text-white"
                  : "border border-line bg-white/60 text-ink hover:border-primary/30 hover:bg-white"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      {/* Groups */}
      <section className="mt-10">
        {groups.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line bg-white/40 px-6 py-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Users size={24} strokeWidth={1.8} />
            </div>

            <h2 className="mt-5 font-display text-2xl text-ink">
              No groups yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
              You haven't joined or created a group yet. Create a group or join
              an existing one to start managing funds together.
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
                Join a Group
              </Link>
            </div>
          </div>
        ) : filteredGroups.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line bg-white/40 px-6 py-10 text-center">
            <h2 className="font-display text-xl text-ink">
              No {filter === "admin" ? "admin" : "member"} groups found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
              You don't currently have any groups matching this filter.
            </p>

            <button
              onClick={() => setFilter("all")}
              className="mt-5 rounded-full border border-line bg-white/60 px-5 py-2.5 text-sm font-medium text-ink transition hover:border-primary/30 hover:bg-white"
            >
              View all groups
            </button>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredGroups.map((group) => (
              <GroupCard
                key={group.id}
                id={group.id}
                name={group.name}
                role={group.role}
                members={group.members}
                contribution={group.contribution}
                nextDueDate={group.nextDueDate}
                progress={group.progress}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Groups;
