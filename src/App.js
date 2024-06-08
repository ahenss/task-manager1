// src/App.js
import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { getTasks, deleteTask, completeTask, deleteAllTasks } from './services/taskService';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching tasks');
      setLoading(false);
    }
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
  };

  const handleComplete = async (id) => {
    try {
      const updatedTask = await completeTask(id);
      setTasks((prevTasks) => prevTasks.map((task) => (task._id === id ? updatedTask : task)));
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };
  

  const handleSave = () => {
    setCurrentTask(null);
    fetchTasks(); // Refetch tasks after save
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks(); // Refetch tasks after delete
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      console.log('Deleting all tasks...'); // Debugging statement
      const response = await deleteAllTasks();
      console.log('Response:', response); // Debugging statement
      setTasks([]); // Clear the tasks in the state
    } catch (error) {
      console.error('Error deleting all tasks:', error);
    }
  };

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="app">
      <TaskForm currentTask={currentTask} onSave={handleSave} />
      <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} onComplete={handleComplete} />
    </div>
  );
};

export default App;
