import { ArrowRight, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

const contributions = [
  {
    id: 1,
    groupName: "Monthly Savings Group",
    amount: "₱500.00",
    dueDate: "Sep 10",
    status: "Due soon",
  },
  {
    id: 2,
    groupName: "Emergency Fund Circle",
    amount: "₱1,000.00",
    dueDate: "Sep 15",
    status: "Pending",
  },
  {
    id: 3,
    groupName: "Weekend Savings Circle",
    amount: "₱300.00",
    dueDate: "Sep 20",
    status: "Upcoming",
  },
];

const UpcomingContributions = () => {
  return (
    <section className="rounded-2xl border border-line bg-white/60 p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted">Contributions</p>

          <h2 className="mt-1 font-display text-2xl text-ink">
            Upcoming contributions
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted">
            Keep track of your upcoming group payments.
          </p>
        </div>

        <Link
          to="/contributions"
          className="flex shrink-0 items-center gap-1 text-sm font-medium text-primary transition hover:text-primary-light"
        >
          View all
          <ArrowRight size={16} strokeWidth={1.8} />
        </Link>
      </div>

      {/* Contribution List */}
      <div className="mt-6">
        {contributions.map((contribution, index) => (
          <div
            key={contribution.id}
            className={`py-5 ${
              index !== contributions.length - 1
                ? "border-b border-divider"
                : ""
            }`}
          >
            {/* Top Row */}
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">
                  {contribution.groupName}
                </p>

                <div className="mt-2 flex items-center gap-2 text-xs text-muted">
                  <CalendarDays size={15} strokeWidth={1.8} />

                  <span>Due {contribution.dueDate}</span>
                </div>
              </div>

              <p className="shrink-0 font-mono text-base font-medium text-ink">
                {contribution.amount}
              </p>
            </div>

            {/* Status */}
            <div className="mt-4">
              <span className="inline-flex rounded-full bg-[#F5EDD9] px-3 py-1 text-xs font-medium text-[#8C6D1F]">
                {contribution.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingContributions;
