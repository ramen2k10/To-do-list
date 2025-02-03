import React, { useState } from "react";

import './updateList.css';

import { updateTaskInfo } from "../services/updateTaskInfo"

const UpdateTaskList = ({ tasks }) => {
  const [completedTasks, setCompletedTasks] = useState({});
  const [taskCompleted, setTaskCompleted] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");

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

  const handleEditClick = (index) => {
    setEditingIndex(index); // Set the index of the task being edited
    setEditedText(tasks[index].taskname); // Load existing task name into input field
  };

  const handleSaveEdit = (index) => {
    //onEditTask(index, editedText);
    setEditingIndex(null); // Exit editing mode
  };

  return (
    <div className="task-list-container">
      {tasks.map((task, index) => (
        <div key={index} className="task-item">
          <input 
            type="checkbox" 
            checked={completedTasks[index] || false} 
            onChange={() => handleCheckboxChange(index)} 
          />

          {editingIndex === index ? (
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="edit-input"
            />
          ) : (
            <span className={`task-text ${completedTasks[index] ? "completed" : ""}`}>
              {task.taskname}
            </span>
          )}
          {editingIndex === index ? (
            <button className="save-button" onClick={() => handleSaveEdit(index)}>💾</button>
          ) : (
            <button className="edit-button" onClick={() => handleEditClick(index)}>✏️</button>
          )}
          <button className="delete-button">
            ❌
          </button>
        </div>
      ))}
    </div>
  );
};

export default UpdateTaskList;
