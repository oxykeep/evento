import EventCard from "./EventCard";

// shows a list of events or a message if there aren't any
const EventsList = ({ events }) => {
  // if no events exist or the list is empty, show a message
  if (!events || events.length === 0) {
    return (
      <p className="text-center text-gray-500">Brak dostępnych wydarzeń</p> // "No available events" in Polish
    );
  }

  // render the list of event cards
  return (
    <div className="eventList-container">
      {events.map((event) => (
        // each event gets its own card with a unique key
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventsList;
