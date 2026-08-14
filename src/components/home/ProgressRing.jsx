const ProgressRing = () => {
  const radius = 110;
  const circumference = 2 * Math.PI * radius;

  const progress = 75;

  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative mx-auto h-[330px] w-[330px]">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 280 280">
        {/* Background ring */}
        <circle
          cx="140"
          cy="140"
          r={radius}
          fill="none"
          stroke="#E7E6DC"
          strokeWidth="12"
        />

        {/* Progress ring */}
        <circle
          cx="140"
          cy="140"
          r={radius}
          fill="none"
          stroke="#1F4B3F"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-4xl text-ink">75%</span>

        <span className="mt-2 text-sm text-muted">contribution progress</span>
      </div>
      {/* <div className="mt-6 text-center">
        <p className="font-mono text-2xl text-ink">₱180,000</p>

        <p className="mt-1 text-sm text-muted">of ₱240,000 goal</p>
      </div> */}
    </div>
  );
};

export default ProgressRing;
