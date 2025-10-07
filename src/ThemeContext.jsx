// ThemeContext.jsx
import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("themeColors");
    return saved ? JSON.parse(saved) : { primary: "#7c3aed", bg: "#f9f9fb" };
  });

  useEffect(() => {
    localStorage.setItem("themeColors", JSON.stringify(theme));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
