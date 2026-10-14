import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="task-list-container">
      <h2>My Tasks</h2>

      {tasks.length === 0 ? (
        <div className="no-tasks">
          <p>No tasks available.</p>
        </div>
      ) : (
        <div className="task-grid">
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
