import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";

export default function SortableItem({ id, task, onToggle, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <motion.li
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 40 }}
      {...attributes}
      className={`flex items-center justify-between bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg shadow-sm ${
        isDragging ? "opacity-60" : ""
      }`}
    >
      {/* Drag handle */}
      <div {...listeners} className="mr-3 cursor-grab select-none text-gray-400" title="Drag to reorder" onClick={(e) => e.stopPropagation()}>
        ☰
      </div>

      {/* Task label + checkbox */}
      <label className="flex items-center gap-3 flex-1 cursor-pointer">
        <input
          type="checkbox"
          checked={!!task.done}
          onChange={(e) => { e.stopPropagation(); onToggle(task.id); }}
          className="w-4 h-4 rounded"
          aria-label={`Mark ${task.text} done`}
        />
        <span
          className={`select-none ${task.done ? "line-through text-gray-400" : "text-gray-800 dark:text-gray-100"}`}
          onClick={() => onToggle(task.id)} // toggle when clicking text
        >
          {task.text}
        </span>
      </label>

      {/* Delete button */}
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
        className="text-red-500 hover:text-red-700 dark:hover:text-red-400 ml-2"
        aria-label="Delete task"
      >
        ✕
      </button>
    </motion.li>
  );
}
