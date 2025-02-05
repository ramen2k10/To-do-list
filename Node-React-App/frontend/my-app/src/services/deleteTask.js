const API_URL = "http://localhost:9001/api/deleteTask"; // Replace with your actual API URL

export const deleteTaskInfo = async (taskId, task) => {
  try {
    console.log("Send the delete request to backend to delete task:", taskId, task);
    const response = await fetch(API_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskname: task,  taskId: taskId}),
    });

    if (response.ok) {
        const responseData = await response.json();
        console.log("Response from server:", responseData);
        return responseData;  // Return the response from the server for better use in the component
      } else {
        throw new Error("Failed to update task");
      }
  } catch (error) {
    console.error("Error adding task:", error);
    return null;
  }
};