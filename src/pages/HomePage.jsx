import { useNavigate } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi"; // Import the down arrow icon
import Button from "../components/UI/Button";
import carpetImage from "../assets/carpet2.jpg";
import EventsList from "../components/Events/EventsList";
import { useAuth } from "../context/AuthContext";

import { useState } from "react";
const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Odkrywaj nadchodzące wydarzenia"
  );

  // Funkcja do edycji wiadomości powitalnej (można dodać formularz)
  const handleEditWelcome = () => {
    const newMessage = prompt("Edytuj wiadomość powitalną:", welcomeMessage);
    if (newMessage) setWelcomeMessage(newMessage);
  };
  // Przykładowe dane wydarzeń
  const mockEvents = [
    {
      id: 1,
      title: "Koncert Rockowy",
      date: "2023-12-15",
      description: "Największe gwiazdy rocka w jednym miejscu!",
      location: "Warszawa, Stadion Narodowy",
      image: "https://via.placeholder.com/400x200?text=Koncert+Rockowy",
    },
    {
      id: 2,
      title: "Festival Smaków",
      date: "2023-11-20",
      description: "Odkryj kulinaria z całego świata",
      location: "Kraków, Rynek Główny",
      image: "https://via.placeholder.com/400x200?text=Festival+Smaków",
    },
    {
      id: 3,
      title: "Maraton Programistów",
      date: "2023-10-10",
      description: "24-godzinne wyzwanie codingowe",
      location: "Online",
      image: "https://via.placeholder.com/400x200?text=Hackathon",
    },
  ];

  return (
    <div className="text-center py-12">
      <div className="main-image">
        <img src={carpetImage} alt="carpet" className="main-image__img" />
      </div>
      <div className="">
        <div className="title-smaller flex flex-col items-center justify-center mt-8 mb-8">
          <p className="title-smaller-text text-xl font-medium mb-2">
            Przeglądaj wydarzenia
          </p>
        </div>
        <div className="homepage-arrow">
          <FiChevronDown className="text-2xl animate-bounce text-gray-600" />
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Najbliższe wydarzenia</h2>
        <EventsList events={mockEvents} />
      </section>
    </div>
  );
};

export default HomePage;
