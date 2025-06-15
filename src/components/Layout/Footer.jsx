import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// the footer component with conditional sign-up section
const Footer = () => {
  const navigate = useNavigate();
  // check if user is logged in
  const { isAuthenticated } = useAuth();

  return (
    <footer className="bg-gray-100 py-8">
      {/* show join section only for logged out users */}
      {!isAuthenticated && (
        <div className="join text-center mb-6">
          <h3 className="text-xl font-semibold mb-3">Dołącz do nas</h3>{" "}
          {/* "Join us" in Polish */}
          <p className="mb-4">
            Zarejestruj się, aby otrzymywać powiadomienia
          </p>{" "}
          {/* "Register to get notifications" */}
          <Button
            onClick={() => navigate("/register")}
            className="bg-blue-600 text-white"
          >
            Rejestracja {/* "Registration" in Polish */}
          </Button>
        </div>
      )}

      {/* copyright notice */}
      <div className="container mx-auto text-center text-gray-600">
        <p>© 2025 EVENTOME. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
