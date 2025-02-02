import React, { useEffect, useState } from 'react';

import '../styles/TodoList.css'; 
import UpdateTaskList from "../components/UpdateTaskList"; 
import { addTaskToBackend } from "../services/todoService"
import { fetchTaskInfo } from "../services/fetchTaskInfo"

const TodoList = () => {

  const [newTaskText, setNewTaskText] = useState('');
  const [isValidTask, setIsValidTask] = useState(false);
  const [tasks, setTasks] = useState([]); 


  const handleInputChange = (e) => {
    const taskInfo = e.target.value;
    const isValid = taskInfo.trim().length > 0;
    setIsValidTask(isValid);
    setNewTaskText(taskInfo);
  };

  useEffect(() => {
    //console.log("Final the task info", newTaskText);
  }, [newTaskText]);

  useEffect(() => {
    const getTasks = async () => {
      const fetchedTasks = await fetchTaskInfo();
      if (fetchedTasks) {
        console.log("Fetched tasks from backend:", fetchedTasks);
        setTasks(fetchedTasks);  // Update the state with the fetched tasks
      }
    };

    getTasks();  // Call the function to fetch tasks
  }, []);

  const handleAddTask = async () => {
    console.log("Adding the task info", newTaskText);
    if (newTaskText.trim()){
      const addedTask = await addTaskToBackend(newTaskText);
     
      if (addedTask) {
        console.log("Current task is ", addedTask);
        setTasks([...tasks, addedTask.taskname]);
      }
      setNewTaskText('');
      setIsValidTask(false);
    }
  };

  return (
    <div className="todo-container">
      <h2>To-do list</h2>
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
