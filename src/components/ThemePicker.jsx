import React from "react";
import { themes } from "../themes";

export default function ThemePicker({ theme, setTheme }) {
  return (
    <div className="flex gap-2 mb-4">
      {Object.values(themes).map(t => (
        <button
          key={t.name}
          onClick={() => setTheme(t)}
          className={`${t.primary} px-3 py-1 rounded-md`}
        >
          {t.name}
        </button>
      ))}
    </div>
  );
}
