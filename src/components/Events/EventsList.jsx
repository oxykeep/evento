// src/components/Events/EventsList.jsx

import EventCard from "./EventCard";

const EventsList = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <p className="text-center text-gray-500">Brak dostępnych wydarzeń</p>
    );
  }

  return (
    <div className="eventList-container">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventsList;
