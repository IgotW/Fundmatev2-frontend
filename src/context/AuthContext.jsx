import { createContext, useState, useEffect } from "react";
import { getProfile } from "../api/auth.api.js";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restoreUser = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await getProfile(token);

        console.log("Profile restored:", response);

        setUser(response.data);
      } catch (error) {
        console.error("Failed to restore user:", error);

        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    restoreUser();
  }, [token]);

  const login = (userData, authToken) => {
    localStorage.setItem("token", authToken);

    setToken(authToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
