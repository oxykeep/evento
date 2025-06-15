import { Link } from "react-router-dom";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";

// login page with form and registration options
const LoginPage = () => {
  return (
    <div className="login-container">
      {/* page title */}
      <h2 className="title">LOGOWANIE</h2>

      {/* login form */}
      <form className="space-y-4">
        {/* email input */}
        <Input type="email" placeholder="Email" />

        {/* password input */}
        <Input type="password" placeholder="Hasło" />

        {/* submit button */}
        <div className="register-button">
          <Button type="submit" className="w-full bg-blue-600 text-white py-2">
            Zaloguj się {/* "Log in" in Polish */}
          </Button>
        </div>
      </form>

      {/* registration prompt section */}
      <div className="mt-6 text-center">
        <p className="mb-2">Nie masz jeszcze konta?</p>
        <Link to="/register">
          <Button className="w-full bg-green-500 text-white py-2">
            Zarejestruj się
          </Button>
        </Link>
      </div>

      {/* password recovery option */}
      <div className="mt-6 text-center">
        <div className="register-button-asking">
          <Button variant="text" className="text-blue-600">
            Zapomniałeś hasła?
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
