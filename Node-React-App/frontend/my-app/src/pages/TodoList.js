import React, { useEffect, useState } from 'react';

import '../styles/TodoList.css'; 
import UpdateTaskList from "../components/UpdateTaskList"; 

const TodoList = () => {

  const [newTaskText, setNewTaskText] = useState('');
  const [isValidTask, setIsValidTask] = useState(false);
  const [tasks, setTasks] = useState([
    "Buy groceries 🛒",
    "Complete project report 📑",
    "Schedule a meeting 📅",
  ]); 


  const handleInputChange = (e) => {
    const taskInfo = e.target.value;
    const isValid = taskInfo.trim().length > 0;
    setIsValidTask(isValid);
    setNewTaskText(taskInfo);
    console.log("Final the task info1", newTaskText);
  };

  useEffect(() => {
    console.log("Final the task info", newTaskText);
  }, [newTaskText]);

  const handleAddTask = () => {
    console.log("Adding the task info", newTaskText);
    if (newTaskText.trim()){
      setNewTaskText('');
      setIsValidTask(false);
    }
  };

  return (
    <div className="todo-container">
      <h2>To-do list</h2>
          {/* Render task list */}
          <UpdateTaskList tasks={tasks} />
      <div className="add-task">
        <input 
          type="text" 
          placeholder="Add a new task..." 
          value={newTaskText} 
          onChange={handleInputChange} 
        />
        <button onClick={handleAddTask} disabled={!isValidTask}>
          <span className="plus-circle">+</span>
        </button>
      </div>
    </div>
  );
};

export default TodoList;
