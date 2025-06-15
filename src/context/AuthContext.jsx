import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  const login = (user) => {
    setIsAuthenticated(true);
    setUserData(user || { name: "TestUser", email: "test@example.com" });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserData(null);
  };

  // Funkcja do ręcznego przełączania stanu logowania
  const toggleAuth = () => {
    setIsAuthenticated((prev) => !prev);
    if (!isAuthenticated) {
      setUserData({ name: "TestUser", email: "test@example.com" });
    } else {
      setUserData(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userData,
        login,
        logout,
        toggleAuth, // Dodajemy nową funkcję do kontekstu
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
