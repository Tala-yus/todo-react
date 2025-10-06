import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggle, onDelete }) {
return ( <ul className="space-y-2"> <AnimatePresence initial={false}>
{tasks.length === 0 ? (
<motion.li
key="empty"
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
className="text-center text-gray-500 dark:text-gray-400 py-4"
>
No tasks yet — add one!
</motion.li>
) : (
tasks.map((task) => ( <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
))
)} </AnimatePresence> </ul>
);
}

export default TaskList;
