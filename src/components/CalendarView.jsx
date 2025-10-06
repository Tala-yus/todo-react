import React, { useState } from "react";
import Calendar from "react-calendar";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import 'react-calendar/dist/Calendar.css';

export default function CalendarView({ tasks, setTasks, darkMode }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Tasks for the selected date
  const tasksForDate = tasks.filter(task => {
    if (!task.dueDate) return false;
    return new Date(task.dueDate).toDateString() === selectedDate.toDateString();
  });

  // Highlight dates with tasks
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const hasTask = tasks.some(task => {
        if (!task.dueDate) return false;
        return new Date(task.dueDate).toDateString() === date.toDateString();
      });
      return hasTask ? "bg-purple-200 dark:bg-purple-600 rounded" : null;
    }
  };

  // Drag handlers
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    const taskId = active.id;
    const newDate = over.id; // over.id will be the date string
    setTasks(prev =>
      prev.map(t =>
        t.id === taskId ? { ...t, dueDate: newDate } : t
      )
    );
  };

  return (
    <div className="mt-4">
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        className={`w-full rounded-lg overflow-hidden ${darkMode ? "react-calendar-dark" : ""}`}
        tileClassName={tileClassName}
      />

      <DndContext onDragEnd={handleDragEnd}>
        <div className="mt-4">
          {tasksForDate.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No tasks for this date.
            </p>
          ) : (
            <ul className="space-y-2">
              {tasksForDate.map(task => (
                <DraggableTask key={task.id} task={task} />
              ))}
            </ul>
          )}
        </div>
      </DndContext>

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

function DraggableTask({ task }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({ id: task.id });
  const style = { transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`, transition };

  return (
    <motion.li
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 40 }}
      className={`flex justify-between items-center px-3 py-2 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700`}
      {...listeners}
      {...attributes}
    >
      <span className={`${task.done ? "line-through text-gray-400 dark:text-gray-300" : "text-gray-800 dark:text-gray-100"}`}>
        {task.text} {task.priority ? `| ${task.priority}` : ""}
      </span>
    </motion.li>
  );
}
