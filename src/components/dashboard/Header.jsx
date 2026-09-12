import { Bell, Menu } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.jsx";

const Header = ({ setIsSidebarOpen }) => {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between border-b border-line bg-paper px-5 py-4 sm:px-6 lg:px-8 lg:py-5">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/60 text-muted transition hover:text-primary lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={20} strokeWidth={1.8} />
        </button>

        {/* Page information */}
        <div>
          <p className="text-sm text-muted">Welcome back</p>

          <h1 className="mt-1 font-display text-xl text-ink sm:text-2xl">
            {user?.name || "FundMate User"}
          </h1>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Notifications */}
        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/60 text-muted transition hover:text-primary">
          <Bell size={19} strokeWidth={1.8} />
        </button>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-medium text-ink">{user?.name}</p>

            <p className="text-xs text-muted">{user?.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
