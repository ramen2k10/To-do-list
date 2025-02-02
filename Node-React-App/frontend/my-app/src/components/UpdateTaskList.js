import React, { useState } from "react";
import { updateTaskInfo } from "../services/updateTaskInfo"

const UpdateTaskList = ({ tasks }) => {
  const [completedTasks, setCompletedTasks] = useState({});
  const [taskCompleted, setTaskCompleted] = useState({});

  const handleCheckboxChange = async (index) => {
    console.log("Task to update here...", index)
    const taskToUpdate = tasks[index].taskname;
    const newStatus = !completedTasks[index];
    const response = await updateTaskInfo(taskToUpdate, newStatus);
    if (response){
      setCompletedTasks((prev) => ({
        ...prev,
        [index]: !prev[index],
      }));
    } else {
      console.error("Failed to update task in the database.");
    }
  };

  return (
    <div>
      {tasks.map((task, index) => (
        <div key={index}>
          <input 
            type="checkbox" 
            checked={completedTasks[index] || false} 
            onChange={() => handleCheckboxChange(index)} 
          />
          <span style={{ textDecoration: completedTasks[index] ? "line-through" : "none" }}>
            {task.taskname}
          </span>
        </div>
      ))}
    </div>
  );
};

export default UpdateTaskList;
