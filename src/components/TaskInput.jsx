import React, { useState } from "react";

function TaskInput({ onAdd }) {
const [value, setValue] = useState("");

function handleAdd() {
if (!value.trim()) return;
onAdd(value);
setValue("");
}

return ( <div className="flex gap-2 mb-4">
<input
type="text"
value={value}
onChange={(e) => setValue(e.target.value)}
onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); }}
placeholder="Add a new task..."
className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
aria-label="New task"
/> <button
     onClick={handleAdd}
     className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
   >
Add </button> </div>
);
}

export default TaskInput;
