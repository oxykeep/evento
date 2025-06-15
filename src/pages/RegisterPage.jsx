import { Link } from "react-router-dom";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";

const RegisterPage = () => {
  return (
    <div className="register-container">
      <h2 className="title">REJESTRACJA</h2>

      <form className="space-y-4">
        <Input type="text" placeholder="Imię i nazwisko" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Hasło" />
        <Input type="password" placeholder="Powtórz hasło" />
        <div className="register-button">
          <Button type="submit" className="button">
            Zarejestruj się
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="mb-2">Masz już konto?</p>
        <Link className="title" to="/login">
          <Button className="w-full bg-blue-500 text-white py-2">
            Zaloguj się
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
