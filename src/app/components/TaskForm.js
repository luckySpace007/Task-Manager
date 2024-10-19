// src/components/TaskForm.js
import { useState } from 'react';

export default function TaskForm({ addTask }) {
  const [newTask, setNewTask] = useState({
    id: Date.now(),
    title: '',
    description: '',
    priority: 'low',
    completed: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask({
      id: Date.now(),
      title: '',
      description: '',
      priority: 'low',
      completed: false,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
      />
      <select
        value={newTask.priority}
        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}
