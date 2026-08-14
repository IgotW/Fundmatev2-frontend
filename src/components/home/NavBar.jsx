import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Main navbar */}
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary">
              <div className="h-3 w-3 rounded-full bg-primary" />
            </div>

            <div>
              <span className="font-display text-2xl font-medium text-primary">
                Fund
              </span>
              <span className="font-display text-2xl font-medium text-gold">
                Mate
              </span>
            </div>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#how-it-works"
              className="text-sm font-medium text-muted transition hover:text-ink"
            >
              How it works
            </a>

            <a
              href="#features"
              className="text-sm font-medium text-muted transition hover:text-ink"
            >
              Features
            </a>

            <a
              href="#why-fundmate"
              className="text-sm font-medium text-muted transition hover:text-ink"
            >
              Why FundMate
            </a>
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href="/login"
              className="rounded-full px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-gold"
            >
              Log in
            </a>

            <a
              href="/register"
              className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-light"
            >
              Get started
              <ArrowRight size={16} strokeWidth={1.8} />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-white md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X size={22} strokeWidth={1.8} />
            ) : (
              <Menu size={22} strokeWidth={1.8} />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-divider pb-6 pt-5 md:hidden">
            <nav className="flex flex-col">
              <a
                href="#how-it-works"
                onClick={() => setMenuOpen(false)}
                className="border-b border-divider py-4 text-sm font-medium text-ink"
              >
                How it works
              </a>

              <a
                href="#features"
                onClick={() => setMenuOpen(false)}
                className="border-b border-divider py-4 text-sm font-medium text-ink"
              >
                Features
              </a>

              <a
                href="#why-fundmate"
                onClick={() => setMenuOpen(false)}
                className="border-b border-divider py-4 text-sm font-medium text-ink"
              >
                Why FundMate
              </a>

              <a
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="py-4 text-sm font-medium text-ink"
              >
                Log in
              </a>

              <a
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-primary-light"
              >
                Get started
                <ArrowRight size={16} strokeWidth={1.8} />
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
