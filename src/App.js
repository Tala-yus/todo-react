import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import Filters from "./components/Filters";
import TaskList from "./components/TaskList";
import confetti from "canvas-confetti";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [filter, setFilter] = useState("all");

  // Persist tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Persist theme
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Confetti when all done
  useEffect(() => {
    if (tasks.length > 0 && tasks.every((t) => t.done)) {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
  }, [tasks]);

  function addTask(title) {
    const t = title.trim();
    if (!t) return;
    setTasks((prev) => [...prev, { id: Date.now(), text: t, done: false }]);
    setFilter("all");
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function clearCompleted() {
    setTasks((prev) => prev.filter((t) => !t.done));
  }

  const remaining = tasks.filter((t) => !t.done).length;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors p-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl w-full max-w-md p-6">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} remaining={remaining} />
        <TaskInput onAdd={addTask} />
        <Filters
          filter={filter}
          setFilter={setFilter}
          clearCompleted={clearCompleted}
          total={tasks.length}
          remaining={remaining}
        />
        <TaskList
          tasks={tasks}
          setTasks={setTasks}
          filter={filter}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;
