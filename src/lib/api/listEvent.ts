interface Event {
  id: string;
  summary: string;
  description?: string;
  start: string;
  end: string;
}

async function fetchEvents(): Promise<Event[]> {
  try {
    const response = await fetch(
      "/api/fetch-events?" +
        new URLSearchParams({
          timeMin: new Date().toISOString(),
          timeMax: new Date(
            new Date().setMonth(new Date().getMonth() + 1)
          ).toISOString(),
          maxResults: "20",
        })
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched events:", data.events);
    return data.events;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}

export default fetchEvents;
