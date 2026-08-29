import {
  LayoutDashboard,
  Users,
  CircleDollarSign,
  ReceiptText,
  User,
  LogOut,
  X,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
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
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-line bg-[#F8F8F4] px-4 py-6 shadow-xl transition-transform duration-300 lg:static lg:w-64 lg:translate-x-0 lg:shadow-none ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary">
            <div className="h-3 w-3 rounded-full bg-primary" />
          </div>

          <span className="font-display text-2xl font-medium text-ink">
            FundMate
          </span>
        </div>

        {/* Mobile Close Button */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition hover:bg-primary/5 hover:text-primary lg:hidden"
          aria-label="Close menu"
        >
          <X size={20} strokeWidth={1.8} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-10 flex flex-1 flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
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
