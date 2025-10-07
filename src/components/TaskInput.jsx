import React, { useState } from "react";
import { STICKERS } from "./stickers";

function TaskInput({ onAdd }) {
  const [value, setValue] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [sticker, setSticker] = useState(STICKERS[0]);

  function handleAdd() {
    if (!value.trim()) return;
    onAdd({ text: value, dueDate, priority, sticker, id: Date.now(), done: false });
    setValue(""); setDueDate(""); setPriority("Normal"); setSticker(STICKERS[0]);
  }

  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
        />
        <button
          onClick={handleAdd}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
        >
          Add
        </button>
      </div>
      <div className="flex gap-2">
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)}
          className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 flex-1" />
        <select value={priority} onChange={e => setPriority(e.target.value)}
          className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100">
          <option>Low</option>
          <option>Normal</option>
          <option>High</option>
        </select>
        <select value={sticker} onChange={e => setSticker(e.target.value)}
          className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100">
          {STICKERS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
    </div>
  );
}

export default TaskInput;
