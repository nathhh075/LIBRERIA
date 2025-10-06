import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "light") {
        document.documentElement.classList.remove("dark");
        setIsDarkMode(false);
      } else {
        document.documentElement.classList.add("dark");
        setIsDarkMode(true);
      }
    }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark"); // Quitar modo oscuro
      localStorage.setItem("theme", "light");

      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark"); // Activar modo oscuro
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <button onClick={toggleTheme}>
      {isDarkMode ? (
        <Sun className="h-6 w-6 text-yellow-300" />
      ) : (
        <Moon className="h-6 w-6 text-white" />
      )}
    </button>
  );
};
