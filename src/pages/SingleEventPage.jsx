import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EventDetails from "../components/Events/EventDetails";

/**
 * SingleEventPage component fetches and displays details of a single event
 * based on the event ID from URL parameters.
 */
const SingleEventPage = () => {
  const { eventId } = useParams();

  // State to store fetched event data
  const [event, setEvent] = useState(null);
  // Loading state to indicate fetch in progress
  const [loading, setLoading] = useState(true);
  // Error state to store fetch error messages
  const [error, setError] = useState("");

  /**
   * Effect hook to fetch event data when eventId changes.
   * Fetches event details from API and updates state accordingly.
   */
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/routes/api/event.php?id=${eventId}`);
        if (!response.ok) throw new Error("Wydarzenie nie znalezione");
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) return <p className="text-center mt-8">Ładowanie wydarzenia...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;
  if (!event) return null;

  // Render event details component with fetched event data
  return <EventDetails event={event} />;
};

export default SingleEventPage;
