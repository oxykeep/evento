import EventDetails from "../components/Events/EventDetails";
import carpetImage from "../assets/carpet.jpg";

// mock data for demonstration - would be replaced with real API data
const mockEvents = [
  {
    id: 1,
    title: "Koncert Rockowy", // "Rock Concert"
    date: "2023-12-15",
    description: "Największe gwiazdy rocka w jednym miejscu!", // "Biggest rock stars in one place"
    location: "Warszawa, Stadion Narodowy", // "Warsaw, National Stadium"
    image: carpetImage, // using placeholder image for all events
  },
  {
    id: 2,
    title: "Festival Smaków", // "Flavor Festival"
    date: "2023-11-20",
    description: "Odkryj kulinaria z całego świata", // "Discover cuisines from around the world"
    location: "Kraków, Rynek Główny", // "Krakow, Main Market Square"
    image: carpetImage,
  },
  {
    id: 3,
    title: "Maraton Programistów", // "Programmers Marathon"
    date: "2023-10-10",
    description: "24-godzinne wyzwanie codingowe", // "24-hour coding challenge"
    location: "Online",
    image: carpetImage,
  },
];

// page component that displays details for a single event
const SingleEventPage = () => {
  // renders the EventDetails component with mock data
  // in a real app, we would fetch only the needed event based on URL params
  return <EventDetails events={mockEvents} />;
};

export default SingleEventPage;
