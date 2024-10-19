'use client'; 

import { useState, useEffect } from 'react';
import Task from './components/Task';
import TaskForm from './components/TaskForm';


// Function to simulate fetching data (as in SSR)
async function fetchTasks() {
  return [
    { id: 1, title: 'Task 1', description: 'Description 1', priority: 'high', completed: false },
    { id: 2, title: 'Task 2', description: 'Description 2', priority: 'medium', completed: false },
    { id: 3, title: 'Task 3', description: 'Description 3', priority: 'low', completed: false },
  ];
}

export default function Home() {
  const [taskList, setTaskList] = useState([]);

  // Fetch tasks on component mount (as in SSR)
  useEffect(() => {
    const loadTasks = async () => {
      const tasks = await fetchTasks();
      setTaskList(tasks);
    };
    loadTasks();
  }, []);

  // Add task
  const addTask = (task) => {
    setTaskList([...taskList, task]);
  };

  // Edit task
  const editTask = (updatedTask) => {
    setTaskList(taskList.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  // Delete task
  const deleteTask = (id) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  // Mark task as completed
  const toggleTaskCompletion = (id) => {
    setTaskList(
      taskList.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Sort tasks by priority
  const sortedTasks = taskList.sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div>
      <h1>Task Manager 💼</h1>
      <TaskForm addTask={addTask} />
      <ul>
        {sortedTasks.map((task) => (
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
