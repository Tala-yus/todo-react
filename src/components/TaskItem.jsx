import React from "react";
import { motion } from "framer-motion";

function TaskItem({ task, onToggle, onDelete }) {
return (
<motion.li
initial={{ opacity: 0, y: 8 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, x: 40 }}
layout
className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg shadow-sm"
> <label className="flex items-center gap-3 flex-1 cursor-pointer">
<input
type="checkbox"
checked={task.done}
onChange={() => onToggle(task.id)}
className="w-4 h-4 rounded"
aria-label={`Mark ${task.text} done`}
/>
<span className={`select-none ${task.done ? "line-through text-gray-400" : "text-gray-800 dark:text-gray-100"}`}>
{task.text} </span> </label>

  <div className="flex items-center gap-2">
    <button onClick={() => onDelete(task.id)} className="text-red-500 hover:text-red-700 dark:hover:text-red-400" aria-label="Delete task">
      ✕
    </button>
  </div>
</motion.li>

);
}

export default TaskItem;