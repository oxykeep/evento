import EventCard from "./EventCard";

// shows a list of events or a message if there aren't any
const EventsList = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">Brak dostępnych wydarzeń</p>
    );
  }

  return (
    <div className="events-grid">
      {events.map((event) => (
        <div key={event.id} className="event-card">
          <EventCard event={event} />
        </div>
      ))}
    </div>
  );
};

export default EventsList;
