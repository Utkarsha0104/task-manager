import React from 'react';

const TaskItem = ({ task, onEdit, onDelete }) => {
  const { _id, title, description, status, dueDate } = task;

  const handleDelete = () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this task?');
    if (isConfirmed) {
      onDelete(_id);
    }
  };

  const getStatusBadgeClass = (statusVal) => {
    switch (statusVal) {
      case 'completed':
        return 'badge badge-completed';
      case 'in-progress':
        return 'badge badge-in-progress';
      case 'pending':
      default:
        return 'badge badge-pending';
    }
  };

  const formatStatusText = (statusVal) => {
    switch (statusVal) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'pending':
      default:
        return 'Pending';
    }
  };

  const formattedDueDate = dueDate
    ? new Date(dueDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'No due date';

  return (
    <div className="task-card">
      <div className="task-header">
        <h4 className="task-title">{title}</h4>
        <span className={getStatusBadgeClass(status)}>{formatStatusText(status)}</span>
      </div>

      {description && <p className="task-description">{description}</p>}

      <div className="task-footer">
        <div className="task-date">
          <strong>Due Date:</strong> {formattedDueDate}
        </div>
        <div className="task-actions">
          <button onClick={() => onEdit(task)} className="btn btn-edit">
            Edit
          </button>
          <button onClick={handleDelete} className="btn btn-delete">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
