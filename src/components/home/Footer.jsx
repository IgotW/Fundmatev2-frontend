const Footer = () => {
  return (
    <footer className="border-t border-line bg-paper px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Brand */}
        <div>
          <span className="font-display text-2xl text-primary">Fund</span>
          <span className="font-display text-2xl text-gold">Mate</span>
          <p className="text-sm text-muted">Group finance, made simple.</p>
        </div>
        <div className="mx-left max-w-7xl">
          <p className="text-xs text-muted-light">
            © 2026 FundMate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
