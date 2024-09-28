import type { NextApiRequest, NextApiResponse } from "next";
import { google, calendar_v3 } from "googleapis";

interface ProcessedEvent {
  id: string;
  summary: string;
  description?: string;
  start: string;
  end: string;
}

interface ApiResponse {
  events?: ProcessedEvent[];
  message?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { timeMin, timeMax, maxResults = "10" } = req.query;

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
    });

    const calendar = google.calendar({ version: "v3", auth });

    const result = await calendar.events.list({
      calendarId: "primary",
      timeMin: (timeMin as string) || new Date().toISOString(),
      timeMax: timeMax as string,
      maxResults: parseInt(maxResults as string),
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = result.data.items?.map(
      (event: calendar_v3.Schema$Event): ProcessedEvent => ({
        id: event.id || "",
        summary: event.summary || "",
        description: event.description || undefined,
        start: event.start?.dateTime || event.start?.date || "",
        end: event.end?.dateTime || event.end?.date || "",
      })
    );

    return res.status(200).json({ events });
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({
      message: "Error fetching events",
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}
