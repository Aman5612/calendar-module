"use client";

import React, { useState } from "react";
import { createEvent } from "@/lib/api/createEvent";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

// Shadcn UI imports

function CreateEvent() {
  const [newEvent, setNewEvent] = useState({
    summary: "",
    date: "",
    start: "",
    end: "",
    attendees: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEvent = async () => {
    const eventData = {
      summary: newEvent.summary,
      description: "",
      startDateTime: `${newEvent.date}T${newEvent.start}:00Z`,
      endDateTime: `${newEvent.date}T${newEvent.end}:00Z`,
      attendees: newEvent.attendees.split(",").map((email) => email.trim()),
    };

    try {
      await createEvent(eventData);
      console.log("Event created successfully");
      setNewEvent({ summary: "", date: "", start: "", end: "", attendees: "" });
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Event</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="summary">Event Summary</label>
            <Input
              id="summary"
              name="summary"
              value={newEvent.summary}
              onChange={handleInputChange}
              placeholder="Event Summary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              name="date"
              value={newEvent.date}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="start">Start Time</Label>
            <Input
              id="start"
              type="time"
              name="start"
              value={newEvent.start}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="end">End Time</label>
            <Input
              id="end"
              type="time"
              name="end"
              value={newEvent.end}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="attendees">Attendees</label>
            <Input
              id="attendees"
              name="attendees"
              value={newEvent.attendees}
              onChange={handleInputChange}
              placeholder="Attendees (comma-separated emails)"
            />
          </div>
          <Button onClick={handleAddEvent}>Create Event</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default CreateEvent;
