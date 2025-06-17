import EventCard from "./EventCard";

/**
 * EventsList component displays a list of event cards or a message when no events are available.
 *
 * @param {Object} props
 * @param {Array} props.events - Array of event objects to display
 * @returns JSX.Element
 */
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
