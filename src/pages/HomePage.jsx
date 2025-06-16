// src/pages/HomePage.jsx

import { useNavigate } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi"; // Import the down arrow icon
import Button from "../components/UI/Button";
import carpetImage from "../assets/carpet2.jpg";
import EventsList from "../components/Events/EventsList";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

// the main homepage component showing featured events
const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // welcome message with edit capability (for demo purposes)
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Odkrywaj nadchodzące wydarzenia" // "Discover upcoming events" in Polish
  );

  // function to edit the welcome message (shows a prompt)
  const handleEditWelcome = () => {
    const newMessage = prompt("Edytuj wiadomość powitalną:", welcomeMessage);
    if (newMessage) setWelcomeMessage(newMessage);
  };

  // states for fetched events, loading and error
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/routes/api/events.php");
        const text = await response.text();
        console.log("RAW RESPONSE TEXT:", text);

        const data = JSON.parse(text);
        console.log("PARSED JSON:", data);

        setEvents(data);
      } catch (error) {
        console.error("FETCH ERROR:", error);
        setError("Wystąpił błąd podczas ładowania wydarzeń.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="text-center py-12">
      {/* main hero image */}
      <div className="main-image">
        <img src={carpetImage} alt="carpet" className="main-image__img" />
      </div>

      {/* browse events section */}
      <div className="">
        <div className="title-smaller flex flex-col items-center justify-center mt-8 mb-8">
          <p className="title-smaller-text text-xl font-medium mb-2">
            {welcomeMessage}
          </p>
          {isAuthenticated && (
            <button
              onClick={handleEditWelcome}
              className="text-sm text-blue-500 hover:underline"
            >
              Edytuj wiadomość
            </button>
          )}
        </div>
        {/* animated down arrow */}
        <div className="homepage-arrow">
          <FiChevronDown className="text-2xl animate-bounce text-gray-600" />
        </div>
      </div>

      {/* upcoming events section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Najbliższe wydarzenia</h2>

        {loading && <p>Ładowanie wydarzeń...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && <EventsList events={events} />}
      </section>
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
