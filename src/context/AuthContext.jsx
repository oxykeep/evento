import { createContext, useState, useContext } from "react";

// create the authentication context
const AuthContext = createContext();

// provider component that wraps your app
export const AuthProvider = ({ children }) => {
  // track if user is logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // store user data when logged in
  const [userData, setUserData] = useState(null);

  // handle user login

  // Dodaj te pola do domyślnych danych użytkownika
  const login = (user) => {
    setIsAuthenticated(true);
    setUserData({
      name: user.name || "Jan Kowalski",
      email: user.email || "jan@example.com",
      joinDate: new Date().toISOString(),
      // ... inne pola
    });
  };

  // handle user logout
  const logout = () => {
    setIsAuthenticated(false);
    setUserData(null); // clear user data
  };

  // helper function to toggle auth state (useful for testing)
  const toggleAuth = () => {
    setIsAuthenticated((prev) => !prev);
    // set test data when toggling on, clear when toggling off
    if (!isAuthenticated) {
      setUserData({ name: "TestUser", email: "test@example.com" });
    } else {
      setUserData(null);
    }
  };

  // provide all auth functions and state to children
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userData,
        login,
        logout,
        toggleAuth, // include the toggle function
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook for easy access to auth context
export const useAuth = () => useContext(AuthContext);
