import axios from "axios";

export interface EventData {
  summary: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  attendees: string[];
}

export const createEvent = async (eventData: EventData) => {
  try {
    const formattedEvent = {
      summary: eventData.summary,
      description: eventData.description,
      start: {
        dateTime: eventData.startDateTime,
        timeZone: "UTC", // You might want to make this configurable
      },
      end: {
        dateTime: eventData.endDateTime,
        timeZone: "UTC", // You might want to make this configurable
      },
      attendees: eventData.attendees.map((email) => ({
        email,
        responseStatus: "needsAction",
      })),
      guestsCanModify: true,
      conferenceData: {
        createRequest: {
          requestId: `${Date.now()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    };

    const response = await axios.post("/api/calendar/create", formattedEvent);
    console.log("Event created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};
