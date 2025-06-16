const EventDetails = ({ event }) => {
  if (!event) {
    return <div className="text-center text-red-600">Wydarzenie nie znalezione</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <span className="mr-4">
              Data: {new Date(event.event_date).toLocaleDateString()}
            </span>
            <span>Lokalizacja: {event.location}</span>
          </div>
          <div className="mb-6">
            {event.image ? (
              <img
                src={`/uploads/${event.image}`}
                alt={event.title}
                className="w-full h-64 object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-md">
                Brak zdjęcia
              </div>
            )}
          </div>
          <p className="text-gray-700 mb-6">{event.description}</p>
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-semibold mb-2">Dodał: {event.organizer_name}</h3>
            <p>Kategoria: {event.category_name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
