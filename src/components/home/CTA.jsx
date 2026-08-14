const CTA = () => {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl bg-primary px-8 py-16 text-center md:px-16 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-soft">
            Start managing together
          </p>

          <h2 className="mx-auto mt-5 max-w-2xl font-display text-4xl leading-tight text-white md:text-5xl">
            Ready to grow your group together?
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-white/70">
            Bring your savings, contributions, loans, and financial goals into
            one simple workspace.
          </p>

          <a
            href="/register"
            className="mt-8 inline-flex rounded-full bg-gold px-7 py-3.5 font-semibold text-ink transition hover:bg-gold-soft"
          >
            Get started
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
