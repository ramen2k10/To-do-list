import React, { useState } from 'react';

const initialTaskCollection = [
  {
    taskid: 1,
    taskname: 'Task 1',
    category: 'Development',
    createdata: '2025-01-01',
    enddata: '2025-01-10',
  },
  {
    taskid: 2,
    taskname: 'Task 2',
    category: 'Testing',
    createdata: '2025-01-05',
    enddata: '2025-01-12',
  },
  {
    taskid: 3,
    taskname: 'Task 3',
    category: 'Design',
    createdata: '2025-01-07',
    enddata: '2025-01-14',
  },
];

const [taskCollection, setTaskCollection] = useState(initialTaskCollection);

const addTaskInfo = (newTask) => {
  setTaskCollection((prevCollection) => [...prevCollection, newTask]);
};

const getTaskInfo = () => {
  return taskCollection;
};

export const manageTask = {
  addTaskInfo,
  getTaskInfo,
}; 
