import { useNavigate } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import Button from "../components/UI/Button";
import carpetImage from "../assets/carpet2.jpg";
import EventsList from "../components/Events/EventsList";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // komunikat powitalny, edytowalny tylko jeśli zalogowany (demo)
  const [welcomeMessage, setWelcomeMessage] = useState("Odkrywaj nadchodzące wydarzenia");

  const handleEditWelcome = () => {
    const newMessage = prompt("Edytuj wiadomość powitalną:", welcomeMessage);
    if (newMessage) setWelcomeMessage(newMessage);
  };

  // stany do przechowywania pobranych wydarzeń oraz info o ładowaniu i błędach
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/routes/api/events.php");
        if (!response.ok) throw new Error("Nie udało się pobrać wydarzeń");
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error("Błąd pobierania wydarzeń:", err);
        setError("Wystąpił błąd podczas ładowania wydarzeń.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="text-center py-12">
      {/* obraz hero */}
      <div className="main-image">
        <img src={carpetImage} alt="carpet" className="main-image__img" />
      </div>

      {/* sekcja przeglądania wydarzeń */}
      <div>
        <div className="title-smaller flex flex-col items-center justify-center mt-8 mb-8">
          <p className="title-smaller-text text-xl font-medium mb-2">{welcomeMessage}</p>
          {isAuthenticated && (
            <button
              onClick={handleEditWelcome}
              className="text-sm text-blue-500 hover:underline"
            >
              Edytuj wiadomość
            </button>
          )}
        </div>
        <div className="homepage-arrow">
          <FiChevronDown className="text-2xl animate-bounce text-gray-600" />
        </div>
      </div>

      {/* sekcja nadchodzących wydarzeń */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Najbliższe wydarzenia</h2>
        {loading && <p>Ładowanie wydarzeń...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && <EventsList events={events} />}
      </section>

      {/* przycisk dodawania wydarzenia jeśli zalogowany */}
      <div className="container mx-auto px-4 py-8">
        {isAuthenticated && (
          <div className="add-event-btn">
            <Button
              onClick={() => navigate("/add-event")}
              className="bg-green-600 text-white"
            >
              + Dodaj nowe wydarzenie
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
