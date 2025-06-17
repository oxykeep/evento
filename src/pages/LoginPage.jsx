// src/pages/LoginPage.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { useAuth } from "../context/AuthContext";

/**
 * LoginPage component allows users to log into their account.
 * Handles form input, validation, and authentication.
 */
const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // State for storing email and password input values
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State for storing and displaying error messages
  const [error, setError] = useState("");

  /**
   * Handles input changes for email and password fields.
   * Updates the corresponding state value dynamically.
   * @param {object} e - The event object from the input change.
   */
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /**
   * Handles form submission, validates input, 
   * and calls login method from AuthContext.
   * Navigates to homepage on successful login,
   * or shows error message on failure.
   * @param {object} e - The event object from form submission.
   */
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
    </div>
  );
};

export default LoginPage;
