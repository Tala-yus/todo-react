import React from "react";

function Filters({ filter, setFilter, clearCompleted, total, remaining }) {
return ( 
<div className="flex items-center justify-between mb-4"> <div className="flex gap-2">
<button
onClick={() => setFilter("all")}
className={`px-3 py-1 rounded-md ${filter === "all" ? "bg-purple-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}`}
>
All </button>
<button
onClick={() => setFilter("active")}
className={`px-3 py-1 rounded-md ${filter === "active" ? "bg-purple-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}`}
>
Active </button>
<button
onClick={() => setFilter("completed")}
className={`px-3 py-1 rounded-md ${filter === "completed" ? "bg-purple-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}`}
>
Completed </button> </div>

  <div className="flex items-center gap-3">
    <span className="text-sm text-gray-600 dark:text-gray-300">{remaining}/{total}</span>
    <button onClick={clearCompleted} className="text-sm text-red-500 hover:text-red-700">Clear Completed</button>
  </div>
</div>

);
}

export default Filters;