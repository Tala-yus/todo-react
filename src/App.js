import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import Filters from "./components/Filters";
import TaskList from "./components/TaskList";
import CalendarView from "./components/CalendarView";
import ProgressBar from "./components/ProgressBar";
import confetti from "canvas-confetti";

function App() {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks")) || []);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [filter, setFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => localStorage.setItem("tasks", JSON.stringify(tasks)), [tasks]);
  useEffect(() => {
    if(darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    if (tasks.length > 0 && tasks.every(t => t.done)) {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
  }, [tasks]);

  const remaining = tasks.filter(t => !t.done).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto p-6 flex flex-col h-screen">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} remaining={remaining} />

        <div className="flex flex-1 gap-6 mt-4">
          {/* Sidebar */}
          <div className="w-80 flex-shrink-0 bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 overflow-y-auto">
            <CalendarView tasks={tasks} darkMode={darkMode} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          </div>

          {/* Main area */}
          <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 overflow-y-auto">
            <ProgressBar tasks={tasks} />
            <TaskInput onAdd={task => setTasks(prev => [...prev, task])} />
            <Filters
              filter={filter}
              setFilter={setFilter}
              clearCompleted={() => setTasks(prev => prev.filter(t => !t.done))}
              total={tasks.length}
              remaining={remaining}
            />
            <TaskList
              tasks={tasks.filter(t => !t.dueDate || new Date(t.dueDate).toDateString() === selectedDate.toDateString())}
              setTasks={setTasks}
              filter={filter}
              onToggle={id => setTasks(prev => prev.map(t => t.id === id ? {...t, done: !t.done} : t))}
              onDelete={id => setTasks(prev => prev.filter(t => t.id !== id))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
