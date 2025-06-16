// src/components/Layout/Footer.jsx

import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Zmieniamy z ../ na ../../
const Footer = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // Pobieramy stan autentykacji

  return (
    <footer className="bg-gray-100 py-8">
      {!isAuthenticated && ( // Tylko gdy użytkownik nie jest zalogowany
        <div className="join text-center mb-6">
          <h3 className="text-xl font-semibold mb-3">Dołącz do nas</h3>
          <p className="mb-4">Zarejestruj się, aby otrzymywać powiadomienia</p>
          <Button
            onClick={() => navigate("/register")}
            className="bg-blue-600 text-white"
          >
            Rejestracja
          </Button>
        </div>
      )}
      <div className="container mx-auto text-center text-gray-600">
        <p>© 2025 EVENTOME. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
