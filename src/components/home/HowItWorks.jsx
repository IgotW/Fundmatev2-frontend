const steps = [
  {
    number: "01",
    title: "Create your group",
    description:
      "Set up your group and define how your members will contribute.",
  },
  {
    number: "02",
    title: "Invite members",
    description:
      "Bring your members into the group and keep everyone connected.",
  },
  {
    number: "03",
    title: "Contribute regularly",
    description:
      "Track contributions and stay updated on your group's progress.",
  },
  {
    number: "04",
    title: "Track your fund",
    description:
      "Monitor your savings, loans, and financial progress in one place.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="border-y border-line bg-white/30 px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            How it works
          </p>

          <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">
            From contribution
            <br />
            to progress.
          </h2>

          <p className="mt-5 text-base leading-7 text-muted">
            FundMate keeps the process simple so your group can focus on saving
            and reaching its goals together.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-10 md:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number}>
              <span className="font-mono text-sm text-muted-light">
                {step.number}
              </span>

              <div className="mt-5 h-px w-full bg-line" />

              <h3 className="mt-6 font-display text-2xl text-ink">
                {step.title}
              </h3>

              <p className="mt-3 leading-7 text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
