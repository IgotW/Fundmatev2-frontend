import { Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between border-b border-line bg-paper px-8 py-5">
      {/* Page information */}
      <div>
        <p className="text-sm text-muted">Welcome back</p>

        <h1 className="mt-1 font-display text-2xl text-ink">
          {user?.name || "FundMate User"}
        </h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-5">
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
