import { Link } from "react-router-dom";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";

// registration page with sign-up form and login option
const RegisterPage = () => {
  return (
    <div className="register-container">
      {/* page title */}
      <h2 className="title">REJESTRACJA</h2>

      {/* registration form */}
      <form className="space-y-4">
        {/* full name input */}
        <Input type="text" placeholder="Imię i nazwisko" />

        {/* email input */}
        <Input type="email" placeholder="Email" />

        {/* password input */}
        <Input type="password" placeholder="Hasło" />

        {/* password confirmation */}
        <Input type="password" placeholder="Powtórz hasło" />

        {/* submit button */}
        <div className="register-button">
          <Button type="submit" className="button">
            Zarejestruj się {/* "Register" */}
          </Button>
        </div>
      </form>

      {/* login prompt for existing users */}
      <div className="mt-6 text-center">
        <p className="mb-2">Masz już konto?</p>{" "}
        {/* "Already have an account?" */}
        <Link className="title" to="/login">
          <Button className="w-full bg-blue-500 text-white py-2">
            Zaloguj się {/* "Log in" */}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
