const StatCard = ({ label, value, description, icon: Icon }) => {
  return (
    <div className="rounded-2xl border border-line bg-white/60 p-5 sm:p-6">
      {/* Top section */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted">{label}</p>

        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon size={20} strokeWidth={1.8} />
          </div>
        )}
      </div>

      {/* Main value */}
      <p className="mt-6 font-mono text-2xl font-medium text-ink sm:text-3xl">
        {value}
      </p>

      {/* Description */}
      {description && <p className="mt-2 text-sm text-muted">{description}</p>}
    </div>
  );
};

export default StatCard;
