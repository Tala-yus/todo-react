import React from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export default function CalendarView({ tasks, darkMode, selectedDate, setSelectedDate }) {

  const tasksForDate = tasks.filter(task =>
    task.dueDate && new Date(task.dueDate).toDateString() === selectedDate.toDateString()
  );

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const hasTask = tasks.some(task =>
        task.dueDate && new Date(task.dueDate).toDateString() === date.toDateString()
      );
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

    const tasksOnDate = tasks.filter(task =>
      task.dueDate && new Date(task.dueDate).toDateString() === date.toDateString()
    );
    if (!tasksOnDate.length) return null;

    return (
      <div className="flex flex-col items-center mt-1 gap-1 max-h-16 overflow-y-auto sticker-scroll">
        {tasksOnDate.map(task => (
          <span key={task.id} className="text-xs">
            {task.sticker}
          </span>
        ))}
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
              <li key={task.id} className="px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm flex items-center gap-2">
                <span>{task.sticker}</span>
                <span>{task.text} {task.priority ? `| ${task.priority}` : ""}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <style>{`
        /* Scrollbar hidden */
        .sticker-scroll {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE 10+ */
        }
        .sticker-scroll::-webkit-scrollbar {
          display: none; /* Chrome/Safari/Edge */
        }

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

        /* Gradient fade for stickers */
        .sticker-scroll {
          position: relative;
        }
        .sticker-scroll::before,
        .sticker-scroll::after {
          content: '';
          position: sticky;
          left: 0;
          right: 0;
          height: 0.5rem;
          pointer-events: none;
          z-index: 10;
        }
        .sticker-scroll::before {
          top: 0;
          background: linear-gradient(to bottom, ${darkMode ? '#1f2937' : '#f9f9fb'}, transparent);
        }
        .sticker-scroll::after {
          bottom: 0;
          background: linear-gradient(to top, ${darkMode ? '#1f2937' : '#f9f9fb'}, transparent);
        }
      `}</style>
    </div>
  );
}
