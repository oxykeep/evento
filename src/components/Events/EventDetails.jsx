import { useParams } from "react-router-dom";

// shows detailed information about a specific event
const EventDetails = ({ events }) => {
  // get the event id from the url
  const { eventId } = useParams();

  // find the matching event in our list
  const event = events.find((e) => e.id === parseInt(eventId));

  // if we can't find the event, show an error message
  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="eventDetails-container">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          {/* main event title */}
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>

          {/* event date and location */}
          <div className="eventDetails-container-description">
            <span className="mr-4">
              Date: {new Date(event.date).toLocaleDateString()}
            </span>
            <span>Location: {event.location}</span>
          </div>

          {/* event image */}
          <div className="main-image">
            <img
              src={event.image}
              alt={event.title}
              className="main-image__img"
            />
          </div>

          {/* event description */}
          <p className="text-gray-700 mb-6">{event.description}</p>

          {/* organizer info box */}
          <div className="eventDetails-container-description">
            <h3 className="font-semibold mb-2">
              Organizator: {event.organizer}
            </h3>
            <p>Contact: {event.contact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
