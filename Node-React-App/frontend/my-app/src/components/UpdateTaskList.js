import React, { useState } from "react";

import './updateList.css';

import { updateTaskInfo, updateTaskName } from "../services/updateTaskInfo"
import { deleteTaskInfo } from "../services/deleteTask"

const UpdateTaskList = ({ tasks, setTasks, onEditTask, onDeleteTask  }) => {
  console.log("Props passed to UpdateTaskList:", { setTasks });
  const [completedTasks, setCompletedTasks] = useState({});
  const [taskCompleted, setTaskCompleted] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");

  // const handleCheckboxChange = async (index) => {
  //   console.log("Task to update here...", index)
  //   const taskToUpdate = tasks[index].taskname;
  //   const newStatus = !completedTasks[index];
  //   const response = await updateTaskInfo(taskToUpdate, newStatus);
  //   if (response){
  //     setCompletedTasks((prev) => ({
  //       ...prev,
  //       [index]: !prev[index],
  //     }));
  //   } else {
  //     console.error("Failed to update task in the database.");
  //   }
  // };

  const handleCheckboxChange = async (taskId, status) => {
    console.log("Inputs of checkbox change...", taskId, status)
    // const taskToUpdate = tasks[index].taskname;
     const newStatus = status === 1? 0:1;
     const response = await updateTaskInfo(taskId, newStatus);
    if (response){
      // setCompletedTasks((prev) => ({
      //   ...prev,
      //   [index]: !prev[index],
      // }));
      console.log("Props passed to UpdateTaskList:", { setTasks });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } else {
      console.error("Failed to update task in the database.");
    }
  };

    const updateNameOfTask = async (taskId, taskToUpdate) => {
      const updateTask =  await updateTaskName(taskId, taskToUpdate);
      if (updateTask) {
        console.log("Fetched tasks from backend:", updateTask);
        //setTasks(updateTask);
        //onEditTask(taskId, editedText);
      }
    };

    const deleteTask = async (taskId, taskToDelete) => {
      const deletedTask =  await deleteTaskInfo(taskId, taskToDelete);
      if (deletedTask) {
        console.log(" tasks deleted from backend:", deletedTask);
        //setTasks(updateTask);
        //onEditTask(taskId, editedText);
      }
    };  

  const handleEditClick = (index) => {
    setEditingIndex(index); // Set the index of the task being edited
    setEditedText(tasks[index].taskname); // Load existing task name into input field
    console.log("Updated task name", tasks[index].taskname)
  };

  const handleSaveEdit = (index, taskId) => {
    onEditTask(index, editedText);
    setEditingIndex(null); // Exit editing mode
    console.log("Saved task name", editedText, index, taskId)
    updateNameOfTask (taskId, editedText)
  };

  const handleDeleteClick = (index) => {
    console.log("Delete task", tasks[index].taskname, index)
    const taskToDelete =  tasks[index].taskname;
    deleteTask(index, taskToDelete);
    onDeleteTask(index);
  };

  return (
    <div className="task-list-container">
      {tasks.map((task, index) => (
        <div key={index} className="task-item">
          <input 
            type="checkbox" 
            //checked={completedTasks[index] || false} 
            checked={task.status === 1}
            //onChange={() => handleCheckboxChange(index)} 
            onChange={() => handleCheckboxChange(task.id, task.status )}  
          />
          {editingIndex === index ? (
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="edit-input"
            />
          ) : (
            <span className={`task-text ${task.status === 1 ? "completed" : ""}`}>
              {task.taskname}
            </span>
          )}
          {editingIndex === index ? (
            <button className="save-button" onClick={() => handleSaveEdit(index, task.id)}>💾</button>
          ) : (
            <button className="edit-button" onClick={() => handleEditClick(index)}>✏️</button>
          )}
          <button className="delete-button" onClick={() => handleDeleteClick(index)}>
            ❌
          </button>
        </div>
      ))}
    </div>
  );
};

export default UpdateTaskList;
