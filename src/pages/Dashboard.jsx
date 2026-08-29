import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-paper p-10">
      <h1 className="font-display text-4xl text-ink">
        Welcome to FundMate Dashboard
      </h1>

      <p className="mt-4 text-muted">You are successfully logged in.</p>

      {user && (
        <div className="mt-6">
          <p className="text-ink">Welcome, {user.name}</p>

          <p className="text-muted">{user.email}</p>
        </div>
      )}

      <button
        onClick={handleLogout}
        className="mt-8 rounded-full bg-primary px-6 py-3 font-medium text-white"
      >
        Logout
      </button>
    </main>
  );
};

export default Dashboard;
