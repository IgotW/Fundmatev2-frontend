import { ArrowRight, CalendarDays, Users } from "lucide-react";
import { Link } from "react-router-dom";

const GroupCard = ({
  id,
  name,
  role,
  members,
  contribution,
  nextDueDate,
  progress,
}) => {
  const isLeader = role === "leader";

  return (
    <div className="rounded-2xl border border-line bg-white/60 p-5 transition hover:border-primary/30 hover:bg-white sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="truncate font-display text-xl text-ink">{name}</h2>

          <span
            className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-medium ${
              isLeader
                ? "bg-[#E7F0EA] text-[#2F6350]"
                : "bg-primary/10 text-primary"
            }`}
          >
            {isLeader ? "Leader" : "Member"}
          </span>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Users size={19} strokeWidth={1.8} />
        </div>
      </div>

      {/* Group Details */}
      <div className="mt-6 space-y-3">
        {/* Members */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">Members</span>

          <span className="font-mono text-ink">{members}</span>
        </div>

        {/* Contribution */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">Contribution</span>

          <span className="font-mono text-ink">
            ₱
            {Number(contribution).toLocaleString("en-PH", {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>

        {/* Next Due Date */}
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="flex items-center gap-2 text-muted">
            <CalendarDays size={16} strokeWidth={1.8} />
            Next due date
          </span>

          <span className="text-right text-ink">
            {nextDueDate || "No upcoming cycle"}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-xs text-muted">
          <span>Contribution progress</span>

          <span className="font-mono text-ink">{progress}%</span>
        </div>

        <div className="mt-2 h-2 overflow-hidden rounded-full bg-divider">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* View Group */}
      <Link
        to={`/groups/${id}`}
        className="group mt-6 flex items-center justify-between border-t border-divider pt-4 text-sm font-medium text-primary transition hover:text-primary-light"
      >
        <span>View group</span>

        <ArrowRight
          size={17}
          strokeWidth={1.8}
          className="transition group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
};

export default GroupCard;
