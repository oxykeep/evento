import { Link } from "react-router-dom";
import carpetImg from "../../assets/carpet3.jpg";

/**
 * EventCard component displays brief information about an event,
 * including image, title, date/time, description, location, and a link to details.
 *
 * @param {Object} props
 * @param {Object} props.event - Event data object
 * @returns JSX.Element
 */
const EventCard = ({ event }) => {
  // Parse event date and time into a JavaScript Date object
  const eventDate = new Date(`${event.event_date}T${event.event_time}`);

  // Use event image if available, otherwise fallback to default carpet image
  const imageSrc = event.image ? `/uploads/${event.image}` : carpetImg;

  return (
    <div className="eventCard-container">
      <div className="eventCard-image-container">
        <img
          src={imageSrc}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="eventCard-container-text">
        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-2">
          {eventDate.toLocaleString("pl-PL", {
            dateStyle: "long",
            timeStyle: "short",
          })}
        </p>
        <p className="eventCard-description text-gray-700 mb-3 line-clamp-2">
          {event.description}
        </p>
        <p className="text-sm text-gray-500 mb-4">{event.location}</p>
      </div>

      <Link to={`/events/${event.id}`} className="link-details">
        Szczegóły
      </Link>
    </div>
  );
};

export default EventCard;
