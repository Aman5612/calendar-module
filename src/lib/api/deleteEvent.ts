async function deleteEvent(eventId: string): Promise<void> {
  try {
    const response = await fetch(`/api/delete-event?eventId=${eventId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
}

export default deleteEvent;
