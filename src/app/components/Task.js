// src/components/Task.js
import { useState } from 'react';

export default function Task({ task, editTask, deleteTask, toggleTaskCompletion }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleEdit = () => {
    editTask(updatedTask);
    setIsEditing(false);
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''} ${task.priority}`}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={updatedTask.title}
            onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })}
          />
          <input
            type="text"
            value={updatedTask.description}
            onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })}
          />
          <select
            value={updatedTask.priority}
            onChange={(e) => setUpdatedTask({ ...updatedTask, priority: e.target.value })}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button onClick={handleEdit}>Save</button>
        </div>
      ) : (
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Priority: {task.priority}</p>
          <button onClick={() => toggleTaskCompletion(task.id)}>
            {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
          </button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      )}
    </li>
  );
}
