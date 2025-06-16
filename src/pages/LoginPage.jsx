// src/pages/LoginPage.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { email, password } = formData;

    if (!email || !password) {
      setError("Wszystkie pola są wymagane.");
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.message || "Nieprawidłowy email lub hasło.");
    }
  };

  return (
    <div className="login-container max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6">LOGOWANIE</h2>

      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Hasło"
          value={formData.password}
          onChange={handleChange}
        />
        <div>
          <Button type="submit" className="w-full bg-blue-600 text-white py-2">
            Zaloguj się
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="mb-2">Nie masz jeszcze konta?</p>
        <Link to="/register">
          <Button className="w-full bg-green-500 text-white py-2">
            Zarejestruj się
          </Button>
        </Link>
      </div>

      {/* Opcjonalnie możesz odkomentować i dodać obsługę odzyskiwania hasła */}
      {/* 
      <div className="mt-6 text-center">
        <Button variant="text" className="text-blue-600">
          Zapomniałeś hasła?
        </Button>
      </div>
      */}
    </div>
  );
};

export default LoginPage;
