import { CheckCircle2, Users, Clock3, ArrowUpRight } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "payment",
    title: "Contribution paid",
    description: "Monthly Savings Group",
    amount: "₱500.00",
    date: "Today",
  },
  {
    id: 2,
    type: "group",
    title: "Joined a group",
    description: "Emergency Fund Circle",
    amount: null,
    date: "Yesterday",
  },
  {
    id: 3,
    type: "due",
    title: "Contribution due soon",
    description: "Monthly Savings Group",
    amount: "₱1,000.00",
    date: "Sep 5",
  },
];

const getActivityIcon = (type) => {
  switch (type) {
    case "payment":
      return {
        icon: CheckCircle2,
        className: "bg-[#E7F0EA] text-[#2F6350]",
      };

    case "group":
      return {
        icon: Users,
        className: "bg-primary/10 text-primary",
      };

    case "due":
      return {
        icon: Clock3,
        className: "bg-[#F5EDD9] text-[#8C6D1F]",
      };

    default:
      return {
        icon: ArrowUpRight,
        className: "bg-divider text-muted",
      };
  }
};

const RecentActivity = () => {
  return (
    <section className="rounded-2xl border border-line bg-white/60 p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted">Recent activity</p>

          <h2 className="mt-1 font-display text-2xl text-ink">
            Your latest activity
          </h2>
        </div>

        <button className="text-sm font-medium text-primary transition hover:text-primary-light">
          View all
        </button>
      </div>

      {/* Activity List */}
      <div className="mt-6">
        {activities.map((activity, index) => {
          const activityStyle = getActivityIcon(activity.type);
          const Icon = activityStyle.icon;

          return (
            <div
              key={activity.id}
              className={`flex gap-4 py-4 ${
                index !== activities.length - 1 ? "border-b border-divider" : ""
              }`}
            >
              {/* Icon */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${activityStyle.className}`}
              >
                <Icon size={19} strokeWidth={1.8} />
              </div>

              {/* Activity Details */}
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-ink">
                      {activity.title}
                    </p>

                    <p className="mt-1 truncate text-xs text-muted">
                      {activity.description}
                    </p>
                  </div>

                  {activity.amount && (
                    <p className="shrink-0 font-mono text-sm text-ink">
                      {activity.amount}
                    </p>
                  )}
                </div>

                <p className="mt-2 text-xs text-muted-light">{activity.date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RecentActivity;
