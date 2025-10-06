import React, { useState } from "react";
import Calendar from "react-calendar";
import { motion } from "framer-motion";
import 'react-calendar/dist/Calendar.css';

export default function CalendarView({ tasks, darkMode }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const tasksForDate = tasks.filter(task =>
    task.dueDate && new Date(task.dueDate).toDateString() === selectedDate.toDateString()
  );

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const hasTask = tasks.some(task =>
        task.dueDate && new Date(task.dueDate).toDateString() === date.toDateString()
      );
      return hasTask ? "bg-purple-200 dark:bg-purple-600 rounded" : null;
    }
  };

  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;

    const tasksOnDate = tasks.filter(
      task => task.dueDate && new Date(task.dueDate).toDateString() === date.toDateString()
    );

    if (tasksOnDate.length === 0) return null;

    const displayTasks = tasksOnDate.slice(0, 3);
    const extra = tasksOnDate.length - displayTasks.length;

    return (
      <div className="relative flex justify-center mt-1 group">
        {/* Dots */}
        <div className="flex gap-0.5">
          {displayTasks.map(task => (
            <span
              key={task.id}
              className={`w-2 h-2 rounded-full ${
                task.priority === "High" ? "bg-red-500" :
                task.priority === "Low" ? "bg-green-500" : "bg-gray-500"
              }`}
            ></span>
          ))}
          {extra > 0 && (
            <span className="text-xs text-gray-600 dark:text-gray-300 ml-0.5">+{extra}</span>
          )}
        </div>

        {/* Tooltip rendered outside tile */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-40 max-h-48 p-2 bg-white dark:bg-gray-700 rounded shadow-lg text-xs text-gray-800 dark:text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none overflow-auto z-50">
          {tasksOnDate.map(task => (
            <div key={task.id} className="break-words py-0.5">
              {task.text} {task.priority ? `| ${task.priority}` : ""}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-4">
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        className={`w-full rounded-lg overflow-visible ${darkMode ? "react-calendar-dark" : ""}`}
        tileClassName={tileClassName}
        tileContent={tileContent}
      />

      <div className="mt-4">
        {tasksForDate.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No tasks for this date.
          </p>
        ) : (
          <ul className="space-y-2">
            {tasksForDate.map(task => (
              <motion.li
                key={task.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 40 }}
                className={`flex justify-between items-center px-3 py-2 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700`}
              >
                <span className={`${task.done ? "line-through text-gray-400 dark:text-gray-300" : "text-gray-800 dark:text-gray-100"}`}>
                  {task.text} {task.priority ? `| ${task.priority}` : ""}
                </span>
              </motion.li>
            ))}
          </ul>
        )}
      </div>

      <style>{`
        .react-calendar-dark {
          background-color: #1f2937;
          color: #f3f4f6;
          border-radius: 0.5rem;
        }
        .react-calendar-dark .react-calendar__tile--now {
          background: #4f46e5;
          color: white;
          border-radius: 0.5rem;
        }
      `}</style>
    </div>
  );
}
