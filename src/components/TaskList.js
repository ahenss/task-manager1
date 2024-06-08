// src/components/TaskList.js
import React from 'react';
import './TaskList.css';

const TaskList = ({ tasks, onEdit, onDelete, onComplete }) => {
  return (
    <div className="task-list">
      <h1>Task List</h1>
      {tasks.length ? (
        tasks.map((task) => (
          <div key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            <button onClick={() => onEdit(task)}>Edit</button>
            <button onClick={() => onDelete(task._id)}>Delete</button>
            <button onClick={() => onComplete(task._id)}>Complete</button>
          </div>
        ))
      ) : (
        <p>No tasks available</p>
      )}
    </div>
  );
};

export default TaskList;
