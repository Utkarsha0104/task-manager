import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { getTasks, createTask, updateTask, deleteTask } from './api/tasks';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Fetch tasks on initial component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(
        err.response?.data?.message ||
        'Failed to fetch tasks. Please check if backend server is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  const showSuccessNotification = (message) => {
    setSuccessMsg(message);
    setTimeout(() => {
      setSuccessMsg(null);
    }, 4000);
  };

  // Add or Update task handler passed to TaskForm
  const handleFormSubmit = async (taskData) => {
    try {
      setError(null);
      if (currentTask) {
        // Update existing task
        const updated = await updateTask(currentTask._id, taskData);
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t._id === currentTask._id ? updated : t))
        );
        setCurrentTask(null);
        showSuccessNotification('Task updated successfully!');
      } else {
        // Create new task
        const created = await createTask(taskData);
        setTasks((prevTasks) => [created, ...prevTasks]);
        showSuccessNotification('Task created successfully!');
      }
    } catch (err) {
      console.error('Error saving task:', err);
      setError(
        err.response?.data?.message ||
        'An error occurred while saving the task. Please try again.'
      );
    }
  };

  // Edit button click handler
  const handleEditClick = (task) => {
    setCurrentTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel edit handler
  const handleCancelEdit = () => {
    setCurrentTask(null);
  };

  // Delete task handler
  const handleDeleteTask = async (id) => {
    try {
      setError(null);
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== id));
      if (currentTask && currentTask._id === id) {
        setCurrentTask(null);
      }
      showSuccessNotification('Task deleted successfully!');
    } catch (err) {
      console.error('Error deleting task:', err);
      setError(
        err.response?.data?.message ||
        'An error occurred while deleting the task.'
      );
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>MERN Task Manager Utkarsha</h1>
        <p className="subtitle">Manage your daily tasks efficiently</p>
      </header>

      <main className="app-main">
        {error && (
          <div className="alert alert-danger">
            <span>{error}</span>
            <button className="close-btn" onClick={() => setError(null)}>
              &times;
            </button>
          </div>
        )}

        {successMsg && (
          <div className="alert alert-success">
            <span>{successMsg}</span>
          </div>
        )}

        <TaskForm
          onSubmit={handleFormSubmit}
          currentTask={currentTask}
          onCancel={handleCancelEdit}
        />

        {loading ? (
          <div className="loading-spinner">Loading tasks...</div>
        ) : (
          <TaskList
            tasks={tasks}
            onEdit={handleEditClick}
            onDelete={handleDeleteTask}
          />
        )}
      </main>
    </div>
  );
}

export default App;
