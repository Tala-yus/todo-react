import React from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export default function CalendarView({ tasks, darkMode, selectedDate, setSelectedDate }) {
  const tasksForDate = tasks.filter(task => task.dueDate && new Date(task.dueDate).toDateString() === selectedDate.toDateString());

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const hasTask = tasks.some(task => task.dueDate && new Date(task.dueDate).toDateString() === date.toDateString());
      const isToday = date.toDateString() === new Date().toDateString();
      return [
        "rounded-lg transition-all",
        hasTask ? "bg-purple-200 dark:bg-purple-600" : "",
        isToday ? "ring-2 ring-purple-500 dark:ring-purple-400" : ""
      ].join(" ");
    }
  };

  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;

    const tasksOnDate = tasks.filter(task => task.dueDate && new Date(task.dueDate).toDateString() === date.toDateString());
    if (!tasksOnDate.length) return null;

    return (
      <div className="flex justify-center mt-1 gap-1">
        {tasksOnDate.slice(0, 3).map(task => (
          <span
            key={task.id}
            className={`w-2 h-2 rounded-full ${
              task.priority === "High" ? "bg-red-500" :
              task.priority === "Low" ? "bg-green-500" : "bg-gray-500"
            }`}
          />
        ))}
        {tasksOnDate.length > 3 && (
          <span className="text-xs text-gray-600 dark:text-gray-300">+{tasksOnDate.length - 3}</span>
        )}
      </div>
    );
  };

  return (
    <div className="text-gray-800 dark:text-gray-100">
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        className={`w-full rounded-lg overflow-visible shadow-md ${
          darkMode ? "react-calendar-dark" : "react-calendar-light"
        }`}
        tileClassName={tileClassName}
        tileContent={tileContent}
      />

      <div className="mt-4">
        {tasksForDate.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-2">No tasks for this date.</p>
        ) : (
          <ul className="space-y-2">
            {tasksForDate.map(task => (
              <li key={task.id} className="px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm">
                {task.text} {task.priority ? `| ${task.priority}` : ""}
              </li>
            ))}
          </ul>
        )}
      </div>

      <style>{`
        /* Light mode */
        .react-calendar-light {
          background-color: #f9f9fb;
          border: none;
          color: #111827;
        }
        .react-calendar-light .react-calendar__tile {
          transition: all 0.2s;
        }
        .react-calendar-light .react-calendar__tile:hover {
          background-color: #e0d7ff;
          border-radius: 0.5rem;
        }

        /* Dark mode */
        .react-calendar-dark {
          background-color: #1f2937;
          color: #f3f4f6;
          border: none;
        }
        .react-calendar-dark .react-calendar__tile {
          transition: all 0.2s;
        }
        .react-calendar-dark .react-calendar__tile:hover {
          background-color: #4c1d95;
          border-radius: 0.5rem;
        }

        /* Current day */
        .react-calendar__tile--now {
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
