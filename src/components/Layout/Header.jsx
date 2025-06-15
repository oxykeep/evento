import { Link, useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, toggleAuth } = useAuth();

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="header">
        <div className="header-logo">
          <Link to="/" className="header-logo-text">
            EVENTOME
          </Link>
        </div>
        <nav className="header-buttons">
          <Button
            onClick={toggleAuth}
            className="bg-yellow-500 text-black mr-2"
          >
            {isAuthenticated ? "Symuluj wylogowanie" : "Symuluj logowanie"}
          </Button>

          {isAuthenticated ? (
            <>
              <Button
                onClick={() => navigate("/profile")}
                className="bg-white text-blue-600"
              >
                Mój profil
              </Button>
              <Button onClick={logout} className="bg-red-500 text-white">
                Wyloguj
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate("/login")}
                className="bg-white text-blue-600"
              >
                Logowanie
              </Button>
              <Button
                onClick={() => navigate("/register")}
                className="bg-green-500 text-white"
              >
                Rejestracja
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
