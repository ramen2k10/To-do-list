import { useState } from 'react';

const TaskManager = (initialTaskCollection) => {
  const [taskCollection, setTaskCollection] = useState(initialTaskCollection);

  const addTaskInfo = (newTask) => {
    console.log("Now the task info", newTask);
    setTaskCollection((prevCollection) => [...prevCollection, newTask]);
    taskCollection.push(newTask);
  };

  const getTaskInfo = () => {
    return taskCollection;
  };

  return {
    addTaskInfo,
    getTaskInfo,
  };
};

export default TaskManager;
