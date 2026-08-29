import {
  LayoutDashboard,
  Users,
  CircleDollarSign,
  ReceiptText,
  User,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Groups",
      path: "/groups",
      icon: Users,
    },
    {
      name: "Contributions",
      path: "/contributions",
      icon: CircleDollarSign,
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: ReceiptText,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
  ];

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-line bg-sidebarBg px-4 py-6">
      {/* Logo */}
      <div className="flex items-center gap-3 px-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary">
          <div className="h-3 w-3 rounded-full bg-primary" />
        </div>

        <span className="font-display text-2xl font-medium text-ink">
          FundMate
        </span>
      </div>

      {/* Navigation */}
      <nav className="mt-10 flex flex-1 flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-muted hover:bg-primary/5 hover:text-primary"
                }`
              }
            >
              <Icon size={19} strokeWidth={1.8} />

              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted transition hover:bg-danger-bg hover:text-danger-text"
      >
        <LogOut size={19} strokeWidth={1.8} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
