import { ArrowRight, Users } from "lucide-react";
import { Link } from "react-router-dom";

const GroupQuickAccessCard = ({ id, name, role, members, progress }) => {
  const isAdmin = role === "admin";

  return (
    <Link
      to={`/groups/${id}`}
      className="group block rounded-2xl border border-line bg-white/60 p-5 transition hover:border-primary/30 hover:bg-white"
    >
      {/* Top */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate font-display text-xl text-ink">{name}</h3>

          {/* Role */}
          <span
            className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-medium ${
              isAdmin
                ? "bg-[#E7F0EA] text-[#2F6350]"
                : "bg-primary/10 text-primary"
            }`}
          >
            {isAdmin ? "Admin" : "Member"}
          </span>
        </div>

        <ArrowRight
          size={20}
          strokeWidth={1.8}
          className="shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-primary"
        />
      </div>

      {/* Members */}
      <div className="mt-6 flex items-center gap-2 text-sm text-muted">
        <Users size={17} strokeWidth={1.8} />

        <span>
          {members} {members === 1 ? "member" : "members"}
        </span>
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
    </Link>
  );
};

export default GroupQuickAccessCard;
