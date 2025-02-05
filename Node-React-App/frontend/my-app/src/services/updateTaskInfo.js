const API_URL = "http://localhost:9001/api/updateTask"; // Replace with your actual API URL
const API_URL_ = "http://localhost:9001/api/updateTaskByName"; 

export const updateTaskInfo = async (taskId, status) => {
  try {
    console.log("Send the post request to backend:");
    const statusValue = status ;
    const response = await fetch(API_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId: taskId,  status: statusValue}),
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


export const updateTaskName = async (taskId, task) => {
  try {
    console.log("Send the post request to backend to update task name:", taskId, task);
    const response = await fetch(API_URL_, {
      method: "PUT",
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