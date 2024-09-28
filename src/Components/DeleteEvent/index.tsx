"use client";
import { useState } from "react";
import { Button } from "@/Components/ui/button";

interface EventDetails {
  id: string;
  summary: string;
  start: { dateTime: string };
  end: { dateTime: string };
}

const DeleteEvent = () => {
  const [eventId, setEventId] = useState("");
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEventDetails = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Implement Google Calendar API call to fetch event details
      // This is a placeholder for the actual API call
      const response = await fetch(`/api/events/${eventId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch event details");
      }
      const data = await response.json();
      setEventDetails(data);
    } catch (error) {
      console.error("Error fetching event details:", error);
      setError("Error fetching event details. Please check the Event ID.");
      setEventDetails(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEvent = async () => {
    // Implement Google Calendar API call to delete event
    console.log("Deleting event:", eventId);
    // Add your Google Calendar API integration here

    // After successful deletion:
    setEventDetails(null);
    setEventId("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h2>Delete Event</h2>
      <input
        type="text"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
        placeholder="Event ID"
      />
      <Button onClick={fetchEventDetails} disabled={!eventId || isLoading}>
        {isLoading ? "Loading..." : "Fetch Event Details"}
      </Button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {eventDetails && (
        <div>
          <h3>Event Details</h3>
          <p>Summary: {eventDetails.summary}</p>
          <p>Start: {new Date(eventDetails.start.dateTime).toLocaleString()}</p>
          <p>End: {new Date(eventDetails.end.dateTime).toLocaleString()}</p>
          <Button onClick={handleDeleteEvent}>Confirm Delete</Button>
        </div>
      )}
    </div>
  );
};

export default DeleteEvent;
