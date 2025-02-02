const API_URL = "https://your-backend-api.com/tasks"; // Replace with your actual API URL

export const addTaskToBackend = async (task) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: task }),
    });

    if (!response.ok) throw new Error("Failed to add task");

    return await response.json();
  } catch (error) {
    console.error("Error adding task:", error);
    return null;
  }
};
