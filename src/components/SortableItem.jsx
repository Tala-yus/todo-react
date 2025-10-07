import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";

export default function SortableItem({ id, task, onToggle, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  const today = new Date();
  const dueDate = task.dueDate ? new Date(task.dueDate) : null;
  const isOverdue = dueDate && !task.done && dueDate < today;

  const priorityColor =
    task.priority === "High"
      ? "text-red-600 dark:text-red-400"
      : task.priority === "Low"
      ? "text-green-600 dark:text-green-400"
      : "text-gray-800 dark:text-gray-100";

  return (
    <motion.li
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 40 }}
      {...attributes}
      className={`flex items-center justify-between bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg shadow-sm ${isDragging ? "opacity-60" : ""} ${isOverdue ? "ring-1 ring-red-400 dark:ring-red-500" : ""}`}
    >
      <div {...listeners} className="mr-3 cursor-grab select-none text-gray-400" title="Drag to reorder">☰</div>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={!!task.done}
            onChange={() => onToggle(task.id)}
            className="w-4 h-4 rounded"
          />
          <span className={`select-none ${task.done ? "line-through text-gray-400" : priorityColor}`}>
            {task.sticker ? `${task.sticker} ` : ""}{task.text}
          </span>
        </div>
        <span className={`text-xs ${isOverdue ? "text-red-600 dark:text-red-400 font-bold" : "text-gray-500 dark:text-gray-300"}`}>
          {task.dueDate ? `Due: ${task.dueDate}` : ""} {task.priority ? `| Priority: ${task.priority}` : ""}
        </span>
      </div>
      <button onClick={() => onDelete(task.id)} className="text-red-500 hover:text-red-700 dark:hover:text-red-400 ml-2">✕</button>
    </motion.li>
  );
}
