import { ArrowRight, Play } from "lucide-react";
import ProgressRing from "./ProgressRing";

const Hero = () => {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        {/* Hero content */}
        <div className="max-w-2xl">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Group finance, made simple
          </p>

          <h1 className="font-display text-4xl leading-[1.05] text-ink sm:text-5xl md:text-7xl">
            Manage your money.
            <br />
            <span className="text-primary">Grow together.</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-muted">
            FundMate helps groups manage savings, contributions, loans, and
            financial goals in one simple workspace.
          </p>

          {/* Actions */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="/register"
              className="flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 font-semibold text-ink transition hover:bg-gold-soft"
            >
              Get started
              <ArrowRight size={18} strokeWidth={1.8} />
            </a>

            <a
              href="#how-it-works"
              className="flex items-center gap-2 rounded-full border border-line bg-white/60 px-6 py-3.5 font-medium text-ink transition hover:bg-white"
            >
              <Play size={16} strokeWidth={1.8} />
              See how it works
            </a>
          </div>
        </div>

        {/* Hero visual */}
        <div className="flex flex-col items-center justify-start lg:-translate-y-4">
          <ProgressRing />

          <div className="mt-2 text-center">
            <p className="font-mono text-2xl text-ink">₱180,000</p>
            <p className="mt-1 text-sm text-muted">of ₱240,000 goal</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
