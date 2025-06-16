import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const res = await fetch("/routes/api/auth.php?action=login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.status === "success") {
      setIsAuthenticated(true);
      setUserData(data.user);
      return { success: true };
    } else {
      return { success: false, message: data.message || "Błąd logowania" };
    }
  };

    const setAuth = (user) => {
    setIsAuthenticated(true);
    setUserData(user);
  };

  const logout = async () => {
    await fetch("/routes/api/auth.php?action=logout", {
      method: "GET",
      credentials: "include",
    });
    setIsAuthenticated(false);
    setUserData(null);
  };

  const fetchCurrentUser = async () => {
    try {
      const res = await fetch("/routes/api/auth.php?action=me", {
        credentials: "include",
      });
      const data = await res.json();

      if (data.status === "success" && data.user) {
        setIsAuthenticated(true);
        setUserData(data.user);
      } else {
        setIsAuthenticated(false);
        setUserData(null);
      }
    } catch (err) {
      console.error("Błąd podczas sprawdzania sesji:", err);
      setIsAuthenticated(false);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userData,
        login,
        logout,
        loading,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
