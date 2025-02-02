import React, { useState } from "react";

const UpdateTaskList = ({ tasks }) => {
  const [completedTasks, setCompletedTasks] = useState({});

  const handleCheckboxChange = (index) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
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
