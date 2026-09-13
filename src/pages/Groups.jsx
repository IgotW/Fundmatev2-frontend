import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Users } from "lucide-react";

import GroupCard from "../components/groups/GroupCard.jsx";
import { getMyGroups } from "../api/auth.api.js";
import { useAuth } from "../hooks/useAuth.jsx";

const Groups = () => {
  const { token } = useAuth();

  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchGroups = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        setError("");

        const response = await getMyGroups(token);

        console.log("My groups:", response);

        console.log("Groups API response:", response);

        const mappedGroups = (response.data || []).map((membership) => ({
          id: membership.group._id,
          name: membership.group.name,
          role: membership.role,
          members: membership.group.membersCount ?? 0,
          contribution: membership.group.contributionAmount,
          nextDueDate: membership.group.nextDueDate ?? null,
          progress: membership.group.progress ?? 0,
        }));

        setGroups(mappedGroups);
      } catch (error) {
        console.error("Failed to fetch groups:", error);
        setError(error.message || "Failed to load your groups.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroups();
  }, [token]);

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
            { value: "leader", label: "Leader" },
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
        {isLoading ? (
          <div className="rounded-2xl border border-line bg-white/60 px-6 py-12 text-center">
            <p className="text-sm text-muted">Loading your groups...</p>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-[#FBEAE8] bg-[#FBEAE8] px-6 py-8 text-center">
            <p className="text-sm text-[#9A3B32]">{error}</p>
          </div>
        ) : groups.length === 0 ? (
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
              No {filter === "leader" ? "leader" : "member"} groups found
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
