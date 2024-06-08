// src/components/TaskList.js
import React, { useState, useEffect } from 'react';
import { getTasks, deleteTask } from '../services/taskService';
import './App.css';

const TaskList = ({ onEdit }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <div className="task-list">
      <h1>Task List</h1>
      {tasks.map(task => (
        <div key={task._id} className="task">
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
          <button onClick={() => onEdit(task)}>Edit</button>
          <button onClick={() => handleDelete(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
