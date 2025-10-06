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

const [darkMode, setDarkMode] = useState(() => {
return localStorage.getItem("theme") === "dark";
});

const [filter, setFilter] = useState("all"); // "all" | "active" | "completed"

// persist tasks
useEffect(() => {
localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

// persist theme + apply to <html>
useEffect(() => {
if (darkMode) {
document.documentElement.classList.add("dark");
localStorage.setItem("theme", "dark");
} else {
document.documentElement.classList.remove("dark");
localStorage.setItem("theme", "light");
}
}, [darkMode]);

// confetti when all tasks are completed
useEffect(() => {
if (tasks.length > 0 && tasks.every((t) => t.done)) {
confetti({
particleCount: 150,
spread: 70,
origin: { y: 0.6 },
});
}
}, [tasks]);

// simple beep using Web Audio API
function playBeep() {
try {
const ctx = new (window.AudioContext || window.webkitAudioContext)();
const o = ctx.createOscillator();
const g = ctx.createGain();
o.type = "sine";
o.frequency.value = 880;
o.connect(g);
g.connect(ctx.destination);
g.gain.setValueAtTime(0.0001, ctx.currentTime);
o.start();
g.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.01);
g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
o.stop(ctx.currentTime + 0.21);
} catch (e) {
// ignore if browser blocks AudioContext until user interaction
// it's fine — confetti still works
}
}

function addTask(title) {
const t = title.trim();
if (!t) return;
setTasks((prev) => [...prev, { id: Date.now(), text: t, done: false }]);
setFilter("all");
}

function toggleTask(id) {
let becameDone = false;
setTasks((prev) =>
prev.map((t) => {
if (t.id === id) {
const newDone = !t.done;
if (newDone) becameDone = true;
return { ...t, done: newDone };
}
return t;
})
);
if (becameDone) playBeep();
}

function deleteTask(id) {
setTasks((prev) => prev.filter((t) => t.id !== id));
}

function clearCompleted() {
setTasks((prev) => prev.filter((t) => !t.done));
}

const filteredTasks = tasks.filter((t) => {
if (filter === "active") return !t.done;
if (filter === "completed") return t.done;
return true;
});

const remaining = tasks.filter((t) => !t.done).length;

return ( <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors p-6"> <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl w-full max-w-md p-6"> <Header darkMode={darkMode} setDarkMode={setDarkMode} remaining={remaining} /> <TaskInput onAdd={addTask} /> <Filters
       filter={filter}
       setFilter={setFilter}
       clearCompleted={clearCompleted}
       total={tasks.length}
       remaining={remaining}
     /> <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} /> </div> </div>
);
}

export default App;
