import { NextApiRequest, NextApiResponse } from "next";
import { google, calendar_v3 } from "googleapis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { summary, description, startDateTime, endDateTime } = req.body as {
      summary: string;
      description: string;
      startDateTime: string;
      endDateTime: string;
    };

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });

    const calendar = google.calendar({ version: "v3", auth });

    const event: calendar_v3.Schema$Event = {
      summary,
      description,
      start: {
        dateTime: startDateTime,
        timeZone: "UTC",
      },
      end: {
        dateTime: endDateTime,
        timeZone: "UTC",
      },
    };

    const result = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
    });

    return res
      .status(200)
      .json({ message: "Event created successfully", event: result.data });
  } catch (error) {
    console.error("Error creating event:", error);
    return res
      .status(500)
      .json({
        message: "Error creating event",
        error: (error as Error).message,
      });
  }
}
