import { Link } from "react-router-dom";
import carpetImg from "../../assets/carpet3.jpg";

const EventCard = ({ event }) => {
  return (
    <div className="eventCard-container">
      <div className="eventCard-image-container">
        <img
          src={carpetImg}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="eventCard-container-text">
        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-2">
          {new Date(event.date).toLocaleDateString("pl-PL")}
        </p>
        <p className="text-gray-700 mb-3 line-clamp-2">{event.description}</p>
        <p className="text-sm text-gray-500 mb-4">{event.location}</p>
        <Link to={`/events/${event.id}`} className="link-details">
          Szczegóły
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
