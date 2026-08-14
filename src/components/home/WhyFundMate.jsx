import { CheckCircle2, Eye, Layers3, UsersRound } from "lucide-react";

const benefits = [
  {
    icon: CheckCircle2,
    title: "Simple",
    description:
      "Manage your group's finances without complicated spreadsheets or scattered records.",
  },
  {
    icon: Eye,
    title: "Transparent",
    description:
      "Keep everyone informed about contributions, fund progress, and important group activity.",
  },
  {
    icon: Layers3,
    title: "Organized",
    description:
      "Keep savings, contributions, loans, and financial records together in one workspace.",
  },
  {
    icon: UsersRound,
    title: "Built for groups",
    description:
      "Designed around shared financial goals so your group can manage money together.",
  },
];

const WhyFundMate = () => {
  return (
    <section id="why-fundmate" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Why FundMate
          </p>

          <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">
            Financial management should feel
            <br />
            simple and clear.
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-muted">
            FundMate brings the important parts of group finance together so
            your members can focus on reaching their goals.
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="rounded-2xl border border-line bg-white/60 p-7 transition hover:bg-white"
              >
                <div className="flex items-start gap-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>

                  <div>
                    <h3 className="font-display text-2xl text-ink">
                      {benefit.title}
                    </h3>

                    <p className="mt-3 leading-7 text-muted">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyFundMate;
