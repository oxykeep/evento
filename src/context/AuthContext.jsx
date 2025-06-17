import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

/**
 * Provides authentication context to the application.
 * Manages user login state, user data, and session loading state.
 */
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Logs in the user with given email and password.
   * Sends a POST request to the authentication API.
   * Updates authentication state on success.
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<{success: boolean, message?: string}>} Login result
   */
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
      return { success: false, message: data.message || "Login error" };
    }
  };

  /**
   * Manually sets authentication state and user data.
   * @param {object} user - User data object
   */
  const setAuth = (user) => {
    setIsAuthenticated(true);
    setUserData(user);
  };

  /**
   * Logs out the current user.
   * Sends a GET request to the logout API endpoint.
   * Resets authentication and user data state.
   */
  const logout = async () => {
    await fetch("/routes/api/auth.php?action=logout", {
      method: "GET",
      credentials: "include",
    });
    setIsAuthenticated(false);
    setUserData(null);
  };

  /**
   * Fetches current authenticated user information.
   * Updates authentication and user data state accordingly.
   * Handles session verification on app load.
   */
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
      console.error("Error checking session:", err);
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

/**
 * Custom hook to use authentication context in components.
 * @returns {object} Authentication context value
 */
export const useAuth = () => useContext(AuthContext);
