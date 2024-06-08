// src/components/TaskDetails.js
import React from 'react';

const TaskDetails = ({ task }) => {
  if (!task) return <div>Select a task to see details</div>;

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{task.title}</h5>
        <p className="card-text">{task.description}</p>
        <p className="card-text"><small className="text-muted">Due: {task.dueDate}</small></p>
      </div>
    </div>
  );
};

export default TaskDetails;
