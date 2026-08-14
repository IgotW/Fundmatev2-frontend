import { UsersRound, Wallet, HandCoins } from "lucide-react";

const features = [
  {
    icon: UsersRound,
    title: "Group Savings",
    description:
      "Organize your group's savings and financial goals in one place.",
  },
  {
    icon: Wallet,
    title: "Contributions",
    description: "Keep track of everyone's contributions and payment progress.",
  },
  {
    icon: HandCoins,
    title: "Loans",
    description:
      "Manage borrowing, repayments, and outstanding balances with ease.",
  },
];

const Features = () => {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Everything in one place
          </p>

          <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">
            Everything your group needs
            <br />
            to manage money together.
          </h2>

          <p className="mt-5 text-base leading-7 text-muted">
            FundMate gives groups the tools they need to organize contributions,
            manage funds, and stay on top of their financial goals.
          </p>
        </div>

        {/* Feature cards */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-line bg-white/60 p-7 transition hover:bg-white"
              >
                <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white">
                  <Icon size={20} strokeWidth={1.8} />
                </div>

                <h3 className="font-display text-2xl text-ink">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-muted">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
