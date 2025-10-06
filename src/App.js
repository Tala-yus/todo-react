import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import Filters from "./components/Filters";
import TaskList from "./components/TaskList";
import CalendarView from "./components/CalendarView";
import confetti from "canvas-confetti";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("list");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    if (tasks.length > 0 && tasks.every(t => t.done)) {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
  }, [tasks]);

  function addTask({ text, dueDate, priority }) {
    const t = text.trim();
    if (!t) return;
    setTasks(prev => [
      ...prev,
      {
        id: Date.now(),
        text: t,
        done: false,
        dueDate: dueDate || null,
        priority: priority || "Normal",
      }
    ]);
    setFilter("all");
  }

  function toggleTask(id) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  function clearCompleted() {
    setTasks(prev => prev.filter(t => !t.done));
  }

  const remaining = tasks.filter(t => !t.done).length;

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

        {/* View Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setView("list")}
            className={`px-3 py-1 rounded-md ${view === "list" ? "bg-purple-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}`}
          >
            List View
          </button>
          <button
            onClick={() => setView("calendar")}
            className={`px-3 py-1 rounded-md ${view === "calendar" ? "bg-purple-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}`}
          >
            Calendar View
          </button>
        </div>

        {view === "list" ? (
          <TaskList
            tasks={tasks}
            setTasks={setTasks}
            filter={filter}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ) : (
          <CalendarView tasks={tasks} darkMode={darkMode} />
        )}
      </div>
    </div>
  );
}

export default App;
