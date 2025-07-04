import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SingleEventPage from "./pages/SingleEventPage";
import UserProfilePage from "./pages/UserProfilePage";
import AddEventPage from "./pages/AddEventPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="events/:eventId" element={<SingleEventPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/add-event" element={<AddEventPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
