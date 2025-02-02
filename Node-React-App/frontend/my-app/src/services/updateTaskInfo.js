const API_URL = "http://localhost:9001/api/updateTask"; // Replace with your actual API URL

export const updateTaskInfo = async (task, status) => {
  try {
    console.log("Send the post request to backend:");
    const statusValue = status ? 1 : 0;
    const response = await fetch(API_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskname: task,  taskCompleted: statusValue}),
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
