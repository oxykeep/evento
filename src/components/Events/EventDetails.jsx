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
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          {/* main event title */}
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>

          {/* event date and location */}
          <div className="flex items-center text-gray-600 mb-4">
            <span className="mr-4">
              Date: {new Date(event.date).toLocaleDateString()}
            </span>
            <span>Location: {event.location}</span>
          </div>

          {/* event image */}
          <div className="mb-6">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-64 object-cover rounded-md"
            />
          </div>

          {/* event description */}
          <p className="text-gray-700 mb-6">{event.description}</p>

          {/* organizer info box */}
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-semibold mb-2">Organizer: {event.organizer}</h3>
            <p>Contact: {event.contact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
