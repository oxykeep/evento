import { Link } from "react-router-dom";
import carpetImg from "../../assets/carpet3.jpg";

//EventCard component that displays event information in a card format

const EventCard = ({ event }) => {
  return (
    // Main card container
    <div className="eventCard-container">
      {/* Image container with placeholder image */}
      <div className="eventCard-image-container">
        <img
          src={carpetImg} // Currently using a placeholder image
          alt={event.title} // Alt text for accessibility
          className="w-full h-full object-cover" // Image styling
        />
      </div>

      {/* Text content container */}
      <div className="eventCard-container-text">
        {/* Event title */}
        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>

        {/* Event date formatted in Polish locale */}
        <p className="text-gray-600 mb-2">
          {new Date(event.date).toLocaleDateString("pl-PL")}
        </p>

        {/* Event description with line clamping (max 2 lines) */}
        <p className="text-gray-700 mb-3 line-clamp-2">{event.description}</p>

        {/* Event location */}
        <p className="text-sm text-gray-500 mb-4">{event.location}</p>

        {/* Link to event details page */}
        <Link to={`/events/${event.id}`} className="link-details">
          Szczegóły {/* "Details" in Polish */}
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
