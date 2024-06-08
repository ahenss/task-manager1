import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../services/taskService';
import './TaskForm.css';

const TaskForm = ({ currentTask, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
      setDueDate(new Date(currentTask.dueDate).toISOString().split('T')[0]);
    } else {
      setTitle('');
      setDescription('');
      setDueDate('');
    }
  }, [currentTask]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description, dueDate };
    if (currentTask) {
      await updateTask(currentTask._id, taskData);
    } else {
      await createTask(taskData);
    }
    onSave();
    resetForm();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <button type="submit">{currentTask ? 'Update' : 'Add'} Task</button>
    </form>
  );
};

export default TaskForm;
