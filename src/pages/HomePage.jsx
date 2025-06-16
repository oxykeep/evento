import { useNavigate } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi"; // Import the down arrow icon
import Button from "../components/UI/Button";
import carpetImage from "../assets/carpet2.jpg";
import EventsList from "../components/Events/EventsList";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

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

  // mock event data for demonstration
  const mockEvents = [
    {
      id: 1,
      title: "Koncert Rockowy", // "Rock Concert"
      date: "2023-12-15",
      description: "Największe gwiazdy rocka w jednym miejscu!", // "Biggest rock stars in one place"
      location: "Warszawa, Stadion Narodowy", // "Warsaw, National Stadium"
      image: "https://via.placeholder.com/400x200?text=Koncert+Rockowy",
    },
    {
      id: 2,
      title: "Festival Smaków", // "Flavor Festival"
      date: "2023-11-20",
      description: "Odkryj kulinaria z całego świata", // "Discover cuisines from around the world"
      location: "Kraków, Rynek Główny", // "Krakow, Main Market Square"
      image: "https://via.placeholder.com/400x200?text=Festival+Smaków",
    },
    {
      id: 3,
      title: "Maraton Programistów", // "Programmers Marathon"
      date: "2023-10-10",
      description: "24-godzinne wyzwanie codingowe", // "24-hour coding challenge"
      location: "Online",
      image: "https://via.placeholder.com/400x200?text=Hackathon",
    },
  ];

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
            Przeglądaj wydarzenia {/* "Browse events" in Polish */}
          </p>
        </div>
        {/* animated down arrow */}
        <div className="homepage-arrow">
          <FiChevronDown className="text-2xl animate-bounce text-gray-600" />
        </div>
      </div>

      {/* upcoming events section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Najbliższe wydarzenia</h2>{" "}
        {/* "Upcoming events" */}
        <EventsList events={mockEvents} />
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
        {/* ... reszta kodu */}
      </div>
    </div>
  );
};

export default HomePage;
