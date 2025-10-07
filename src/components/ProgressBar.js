import React from "react";

function ProgressBar({ tasks }) {
  const completion = tasks.length ? (tasks.filter(t => t.done).length / tasks.length) * 100 : 0;
  return (
    <div className="w-full h-3 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden mb-4">
      <div className="h-3 bg-purple-500 transition-all" style={{ width: `${completion}%` }}></div>
    </div>
  );
}

export default ProgressBar;
