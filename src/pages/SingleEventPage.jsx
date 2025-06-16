// src/pages/SingleEventPage.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EventDetails from "../components/Events/EventDetails";

const SingleEventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/routes/api/event.php?id=${eventId}`);
        if (!response.ok) throw new Error("Event not found");
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

  return <EventDetails event={event} />;
};

export default SingleEventPage;
