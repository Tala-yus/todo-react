import React from "react";

function Header({ darkMode, setDarkMode, remaining }) {
return ( <div className="flex justify-between items-center mb-4"> <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">🌸 My To-Do List</h1> <div className="flex items-center gap-3"> <span className="text-sm text-gray-600 dark:text-gray-300">{remaining} left</span>
<button
onClick={() => setDarkMode(!darkMode)}
className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition"
aria-label="Toggle dark mode"
>
{darkMode ? "☀️" : "🌙"} </button> </div> </div>
);
}

export default Header;
