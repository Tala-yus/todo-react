import React from "react";
import {motion } from "framer-motion";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { AnimatePresence } from "framer-motion";
import SortableItem from "./SortableItem";

export default function TaskList({ tasks, setTasks, filter, onToggle, onDelete }) {
  const sensors = useSensors(useSensor(PointerSensor));

  const visibleTasks = tasks.filter(t => {
    if (filter === "active") return !t.done;
    if (filter === "completed") return t.done;
    return true;
  });

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex(t => t.id === active.id);
    const newIndex = tasks.findIndex(t => t.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    setTasks(arrayMove(tasks, oldIndex, newIndex));
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={visibleTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <ul className="space-y-2">
          <AnimatePresence initial={false}>
            {visibleTasks.length === 0 ? (
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
              visibleTasks.map(task => (
                <SortableItem
                  key={task.id}
                  id={task.id}
                  task={task}
                  onToggle={onToggle}
                  onDelete={onDelete}
                />
              ))
            )}
          </AnimatePresence>
        </ul>
      </SortableContext>
    </DndContext>
  );
}
