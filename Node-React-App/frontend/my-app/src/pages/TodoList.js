import React, { useEffect, useState } from 'react';

import '../styles/TodoList.css'; 
import UpdateTaskList from "../components/UpdateTaskList"; 
import { addTaskToBackend } from "../services/todoService"
import { fetchTaskInfo } from "../services/fetchTaskInfo"

const TodoList = () => {
  console.log("TodoList is rendering...");
  const [newTaskText, setNewTaskText] = useState('');
  const [isValidTask, setIsValidTask] = useState(false);
  const [tasks, setTasks] = useState([]); 
  console.log("setTasks in TodoList:", tasks);

  const handleInputChange = (e) => {
    const taskInfo = e.target.value;
    const isValid = taskInfo.trim().length > 0;
    setIsValidTask(isValid);
    setNewTaskText(taskInfo);
  };


  useEffect(() => {
    //console.log("Final the task info", newTaskText);
  }, [newTaskText]);

  // useEffect(() => {
  //   const getTasks = async () => {
  //     const fetchedTasks = await fetchTaskInfo();
  //     if (fetchedTasks) {
  //       console.log("Fetched tasks from backend:", fetchedTasks);
  //       setTasks(fetchedTasks);  // Update the state with the fetched tasks
  //     }
  //   };

  //   getTasks();  // Call the function to fetch tasks
  // }, []);

  const fetchTasks = async () => {
    const fetchedTasks = await fetchTaskInfo();
    // if (fetchedTasks) {
    //   console.log("Fetched tasks from backend:", fetchedTasks.taskname);
    //   setTasks(fetchedTasks.taskname);
    // }
    if (fetchedTasks && fetchedTasks.tasks) {  // ✅ Ensure tasks exist
      console.log("Fetched tasks from backend:", fetchedTasks.tasks, fetchedTasks.tasks);
      setTasks(fetchedTasks.tasks);
    } else {
      console.error("Failed to fetch tasks or tasks are undefined.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []); 

  const handleAddTask = async () => {
    console.log("Adding the task info", newTaskText);
    if (newTaskText.trim()){
      const addedTask = await addTaskToBackend(newTaskText);
     
      if (addedTask) {
        console.log("Current task is ", addedTask);
        setTasks([...tasks, addedTask.taskname]);
        await fetchTasks();
      }
      setNewTaskText('');
      setIsValidTask(false);
    }
  };

  const handleEditTask = (index, updatedTaskName) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, taskname: updatedTaskName } : task
    );
    setTasks(updatedTasks);  // Update state with the modified task list
  };

  const handleDeleteTask = (index) => {
    console.log("Task is deleting...", index);

    // Filter out the task that was deleted
    const updatedTasks = tasks.filter((_, i) => i !== index);
  
    setTasks(updatedTasks);
  };


  return (
    <div className="todo-container">
      <h2>To-do list</h2>
          <UpdateTaskList tasks={tasks} setTasks={setTasks} onEditTask={handleEditTask} onDeleteTask={handleDeleteTask}/>
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
