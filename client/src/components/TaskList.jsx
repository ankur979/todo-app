import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task._id !== id)))
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <div className="container">
      <h1>Task List</h1>
      <Link to="/create" className="create-button">Create New Task</Link>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task._id} className="task-item">
            <div>
              <h2>{task.title}</h2>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
              <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            </div>
            <div className="task-actions">
             <Link  to={`/edit/${task._id}`}>Edit</Link>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
