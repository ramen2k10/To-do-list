const API_URL = "http://localhost:9001/api/add-task"; // Replace with your actual API URL

export const addTaskToBackend = async (task) => {
  try {
    console.log("Send the post request to backend:");
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskname: task }),
    });

    if (response.ok){
      const responseData = await response.json();
      console.log("Response from server:", responseData);
    } else {
      throw new Error("Failed to add task");
    }
    return { taskname: task };
  } catch (error) {
    console.error("Error adding task:", error);
    return null;
  }
};
