"use client";
import { useState, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { ScrollArea } from "@/Components/ui/scroll-area";

const GetEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      // Implement Google Calendar API call to get all events
      // This is a placeholder for the actual API call
      const response = await fetch("/api/google-calendar-events");
      const data = await response.json();
      setEvents(data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>My Google Calendar Events</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={fetchEvents} disabled={loading}>
          {loading ? "Loading..." : "Refresh Events"}
        </Button>
        <ScrollArea className="h-[400px] mt-4">
          {events.map((event, index) => (
            <Card key={index} className="mb-4">
              <CardHeader>
                <CardTitle>{event.summary}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Start:</strong>{" "}
                  {new Date(event.start.dateTime).toLocaleString()}
                </p>
                <p>
                  <strong>End:</strong>{" "}
                  {new Date(event.end.dateTime).toLocaleString()}
                </p>
                {event.description && (
                  <p>
                    <strong>Description:</strong> {event.description}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default GetEvents;
