import EventDetails from "../components/Events/EventDetails";
import carpetImage from "../assets/carpet.jpg";

const mockEvents = [
  {
    id: 1,
    title: "Koncert Rockowy",
    date: "2023-12-15",
    description: "Największe gwiazdy rocka w jednym miejscu!",
    location: "Warszawa, Stadion Narodowy",
    image: carpetImage,
  },
  {
    id: 2,
    title: "Festival Smaków",
    date: "2023-11-20",
    description: "Odkryj kulinaria z całego świata",
    location: "Kraków, Rynek Główny",
    image: carpetImage,
  },
  {
    id: 3,
    title: "Maraton Programistów",
    date: "2023-10-10",
    description: "24-godzinne wyzwanie codingowe",
    location: "Online",
    image: carpetImage,
  },
];

const SingleEventPage = () => {
  return <EventDetails events={mockEvents} />;
};

export default SingleEventPage;
