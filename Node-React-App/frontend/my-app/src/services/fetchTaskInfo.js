const API_URL = "http://localhost:9001/api/fetchAllTask"; // Replace with your actual API URL

export const fetchTaskInfo = async () => {
  try {
    console.log("Send the get request to backend for getting the task info:");
    const response = await fetch(API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        const responseData = await response.json();
        console.log("Response from backend server:", responseData);
  
        return responseData; 
      } else {
        throw new Error("Failed to fetch tasks");
      }
  } catch (error) {
    console.error("Error adding task:", error);
    return null;
  }
};
