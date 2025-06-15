import { Link, useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import { useAuth } from "../../context/AuthContext";

// the main header component with auth controls
const Header = () => {
  const navigate = useNavigate();
  // get auth functions and status from our context
  const { isAuthenticated, logout, toggleAuth } = useAuth();

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="header">
        {/* logo that links back to home */}
        <div className="header-logo">
          <Link to="/" className="header-logo-text">
            EVENTOME
          </Link>
        </div>

        {/* navigation buttons container */}
        <nav className="header-buttons">
          {/* demo auth toggle button (for testing) */}
          <Button
            onClick={toggleAuth}
            className="bg-yellow-500 text-black mr-2"
          >
            {isAuthenticated ? "Symuluj wylogowanie" : "Symuluj logowanie"}
            {/* "Simulate logout/login" in Polish */}
          </Button>

          {/* show different buttons based on auth status */}
          {isAuthenticated ? (
            // logged in user buttons
            <>
              <Button
                onClick={() => navigate("/profile")}
                className="bg-white text-blue-600"
              >
                Mój profil {/* "My profile" in Polish */}
              </Button>
              <Button onClick={logout} className="bg-red-500 text-white">
                Wyloguj {/* "Logout" in Polish */}
              </Button>
            </>
          ) : (
            // logged out user buttons
            <>
              <Button
                onClick={() => navigate("/login")}
                className="bg-white text-blue-600"
              >
                Logowanie {/* "Login" in Polish */}
              </Button>
              <Button
                onClick={() => navigate("/register")}
                className="bg-green-500 text-white"
              >
                Rejestracja {/* "Register" in Polish */}
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
