import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'pending',
    dueDate: ''
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/tasks/${id}`)
        .then(response => {
          const taskData = response.data;
          taskData.dueDate = formatDate(taskData.dueDate);
          setTask(taskData);
        })
        .catch(error => console.error('Error fetching task:', error));
    }
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prevTask => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(`http://localhost:5000/tasks/${id}`, task)
        .then(() => navigate('/'))
        .catch(error => console.error('Error updating task:', error));
    } else {
      axios.post('http://localhost:5000/tasks', task)
        .then(() => navigate('/'))
        .catch(error => console.error('Error creating task:', error));
    }
  };

  return (
    <div className="container">
      <h1>{id ? 'Edit Task' : 'Create Task'}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={task.title} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={task.description} onChange={handleChange} required />
        </label>
        <label>
          Status:
          <select name="status" value={task.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <label>
          Due Date:
          <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} required />
        </label>
        <button type="submit">{id ? 'Update Task' : 'Create Task'}</button>
      </form>
    </div>
  );
};

export default TaskForm;
