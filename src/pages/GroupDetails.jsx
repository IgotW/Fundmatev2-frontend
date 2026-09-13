import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Users } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { getGroupById } from "../api/auth.api.js";
import { useAuth } from "../hooks/useAuth.jsx";

const GroupDetails = () => {
  const { groupId } = useParams();
  const { token } = useAuth();

  const [groupData, setGroupData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGroup = async () => {
      if (!token || !groupId) {
        setIsLoading(false);
        return;
      }

      try {
        setError("");

        const response = await getGroupById(groupId, token);

        console.log("Group details:", response);

        setGroupData(response.data);
      } catch (error) {
        console.error("Failed to fetch group:", error);
        setError(error.message || "Failed to load group.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroup();
  }, [groupId, token]);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-line bg-white/60 px-6 py-12 text-center">
        <p className="text-sm text-muted">Loading group...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Link
          to="/groups"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-primary"
        >
          <ArrowLeft size={17} strokeWidth={1.8} />
          Back to My Groups
        </Link>

        <div className="mt-8 rounded-2xl border border-[#FBEAE8] bg-[#FBEAE8] px-6 py-8 text-center">
          <p className="text-sm text-[#9A3B32]">{error}</p>
        </div>
      </div>
    );
  }

  if (!groupData) {
    return null;
  }

  const { group, membership } = groupData;

  return (
    <div>
      {/* Back */}
      <Link
        to="/groups"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-primary"
      >
        <ArrowLeft size={17} strokeWidth={1.8} />
        Back to My Groups
      </Link>

      {/* Header */}
      <section className="mt-8">
        <p className="text-sm font-medium text-muted">Group details</p>

        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl text-ink sm:text-4xl">
              {group.name}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">
              View your group's information, members, and contribution cycles.
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Users size={22} strokeWidth={1.8} />
          </div>
        </div>
      </section>

      {/* Basic Information */}
      <section className="mt-10">
        <div className="rounded-2xl border border-line bg-white/60 p-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-xs text-muted">Your role</p>
              <p className="mt-1 text-sm font-medium capitalize text-ink">
                {membership.role}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted">Members</p>
              <p className="mt-1 font-mono text-sm text-ink">
                {group.membersCount}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted">Contribution</p>
              <p className="mt-1 font-mono text-sm text-ink">
                ₱
                {Number(group.contributionAmount).toLocaleString("en-PH", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted">Frequency</p>

              {group.contributionFrequency === "custom" ? (
                <div className="mt-1">
                  <p className="text-sm text-ink">Custom</p>

                  <p className="mt-1 text-xs text-muted">
                    Payment days:{" "}
                    {group.paymentDays?.length
                      ? group.paymentDays.join(", ")
                      : "Not specified"}
                  </p>
                </div>
              ) : (
                <p className="mt-1 text-sm capitalize text-ink">
                  {group.contributionFrequency}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Contribution Progress */}
      <section className="mt-6">
        <div className="rounded-2xl border border-line bg-white/60 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-ink">
                Contribution progress
              </p>

              <p className="mt-1 text-xs text-muted">
                Progress based on completed contribution cycles.
              </p>
            </div>

            <span className="font-mono text-lg text-ink">
              {group.progress}%
            </span>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-divider">
            <div
              className="h-full rounded-full bg-primary transition-all duration-700"
              style={{
                width: `${group.progress}%`,
              }}
            />
          </div>
        </div>
      </section>
      {/* Group Members */}
      <section className="mt-6">
        <div className="rounded-2xl border border-line bg-white/60 p-6">
          <div>
            <p className="text-sm font-medium text-ink">Group Members</p>
            <p className="mt-1 text-xs text-muted">
              People currently participating in this group.
            </p>
          </div>

          <div className="mt-5 divide-y divide-divider">
            {groupData.members.map((member) => {
              return (
                <div
                  key={member.user._id}
                  className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm font-medium text-white">
                      {member.user.name
                        ? member.user.name.charAt(0).toUpperCase()
                        : "?"}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-ink">
                        {member.user.name}
                      </p>

                      <p className="truncate text-xs text-muted">
                        {member.user.email}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                      member.role === "leader"
                        ? "bg-[#E7F0EA] text-[#2F6350]"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {member.role === "leader" ? "Leader" : "Member"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Contribution Cycles */}
      <section className="mt-6">
        <div className="rounded-2xl border border-line bg-white/60 p-6">
          <div>
            <p className="text-sm font-medium text-ink">Contribution Cycles</p>
            <p className="mt-1 text-xs text-muted">
              Scheduled contribution cycles for this group.
            </p>
          </div>

          <div className="mt-5 divide-y divide-divider">
            {groupData.cycles.length === 0 ? (
              <p className="py-4 text-sm text-muted">
                No contribution cycles found.
              </p>
            ) : (
              groupData.cycles.map((cycle, index) => (
                <Link
                  key={cycle._id}
                  to={`/groups/${group._id}/cycles/${cycle._id}`}
                  className="group flex flex-col gap-3 rounded-xl px-3 py-4 transition hover:bg-[#F8F8F4] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted">
                      Cycle {index + 1}
                    </p>

                    <p className="text-sm font-medium text-ink">
                      {new Intl.DateTimeFormat("en-PH", {
                        timeZone: "Asia/Manila",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }).format(new Date(cycle.dueDate))}
                    </p>

                    <p className="mt-1 font-mono text-xs text-muted">
                      ₱
                      {Number(cycle.contributionAmount).toLocaleString(
                        "en-PH",
                        {
                          minimumFractionDigits: 2,
                        },
                      )}
                    </p>
                  </div>

                  <span
                    className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium capitalize ${
                      cycle.status === "completed"
                        ? "bg-[#E7F0EA] text-[#2F6350]"
                        : cycle.status === "cancelled"
                          ? "bg-[#FBEAE8] text-[#B3463B]"
                          : "bg-[#F5EDD9] text-[#8C6D1F]"
                    }`}
                  >
                    {cycle.status}
                  </span>
                  <ArrowRight
                    size={17}
                    strokeWidth={1.8}
                    className="text-muted transition group-hover:translate-x-1"
                  />
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GroupDetails;
