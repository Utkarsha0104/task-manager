import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, currentTask, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title || '');
      setDescription(currentTask.description || '');
      setStatus(currentTask.status || 'pending');
      if (currentTask.dueDate) {
        // Format ISO date to YYYY-MM-DD for <input type="date" />
        const formattedDate = new Date(currentTask.dueDate).toISOString().split('T')[0];
        setDueDate(formattedDate);
      } else {
        setDueDate('');
      }
      setValidationError('');
    } else {
      resetForm();
    }
  }, [currentTask]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus('pending');
    setDueDate('');
    setValidationError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || title.trim() === '') {
      setValidationError('Please enter task title');
      return;
    }

    setValidationError('');

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      status,
      dueDate: dueDate ? dueDate : null,
    };

    onSubmit(taskData);
  };

  const handleCancel = () => {
    resetForm();
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="task-form-container">
      <h3>{currentTask ? 'Edit Task' : 'Add New Task'}</h3>
      {validationError && <div className="error-message">{validationError}</div>}
      
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Task Title <span className="required">*</span></label>
          <input
            type="text"
            id="title"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows="3"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate} 
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            {currentTask ? 'Update Task' : 'Add Task'}
          </button>
          {currentTask && (
            <button type="button" onClick={handleCancel} className="btn btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
