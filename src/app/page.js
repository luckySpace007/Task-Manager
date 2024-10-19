'use client';

import { useState, useEffect } from 'react';
import Task from './components/Task';
import TaskForm from './components/TaskForm';

const LOCAL_STORAGE_KEY = 'tasks';

const fetchTasksFromLocalStorage = () => {
  const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedTasks ? JSON.parse(storedTasks) : [];
};

export default function Home() {
  const [taskList, setTaskList] = useState(fetchTasksFromLocalStorage());
  const [searchTerm, setSearchTerm] = useState('');

  // Update local storage whenever taskList changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(taskList));
  }, [taskList]);

  const addTask = (task) => {
    setTaskList((prevTasks) => [...prevTasks, task]);
  };

  const editTask = (updatedTask) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (id) => {
    setTaskList((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const sortedTasks = taskList.sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  // Filter tasks based on search term
  const filteredTasks = sortedTasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Task Manager 💼</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <input
        type="text"
        placeholder="Search tasks 🔍"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '5px', padding: '10px', width: '100%', maxWidth: "580px" , alignItems: "center" }}
        />
      </div>
      <TaskForm addTask={addTask} />
      <ul>
        {filteredTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            editTask={editTask}
            deleteTask={deleteTask}
            toggleTaskCompletion={toggleTaskCompletion}
          />
        ))}
      </ul>
    </div>
  );
}
