// src/pages/RegisterPage.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { useAuth } from "../context/AuthContext";

/**
 * RegisterPage component handles user registration.
 * It manages form state, validates input,
 * sends registration request to the server,
 * and updates auth context on success.
 */
const RegisterPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  // State for registration form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  // State for error messages to display to user
  const [error, setError] = useState("");

  /**
   * Handles input changes in the registration form.
   * Updates the corresponding formData field.
   * @param {object} e - Event object from input change.
   */
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /**
   * Handles form submission.
   * Validates input, sends POST request to register user,
   * sets auth on success and navigates to home page,
   * or sets error message on failure.
   * @param {object} e - Event object from form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, city, password, confirmPassword } = formData;

    if (!name || !email || !city || !password || !confirmPassword) {
      setError("Wszystkie pola są wymagane.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Hasła się nie zgadzają.");
      return;
    }

    try {
      const response = await fetch("/routes/api/auth.php?action=register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          city,
          password,
          password_confirm: confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setError(data.errors.join(" "));
        } else if (data.message) {
          setError(data.message);
        } else {
          setError("Rejestracja nie powiodła się.");
        }
        return;
      }

      // On successful registration, update auth context and navigate home
      setAuth(data.user);
      navigate("/");
    } catch {
      setError("Błąd sieci lub serwera.");
    }
  };

  return (
    <div className="register-container max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6">REJESTRACJA</h2>

      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Imię i nazwisko"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="city"
          placeholder="Miasto"
          value={formData.city}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Hasło"
          value={formData.password}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Powtórz hasło"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <div>
          <Button type="submit" className="w-full bg-green-600 text-white py-2">
            Zarejestruj się
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="mb-2">Masz już konto?</p>
        <Link to="/login">
          <Button className="w-full bg-blue-500 text-white py-2">Zaloguj się</Button>
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
