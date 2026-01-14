"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <button
        className="py-1 sm:py-1.5 px-2 rounded-md border-2 transition-all duration-200 flex items-center justify-center"
        style={{
          backgroundColor: "rgba(6, 78, 59, 0.6)",
          borderColor: "rgba(4, 120, 87, 0.7)",
          color: "rgba(236, 253, 245, 1)",
          width: "auto",
          minWidth: "36px",
        }}
        aria-label="Toggle theme"
      >
        <div className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="py-1 sm:py-1.5 px-2 rounded-md border-2 transition-all duration-200 flex items-center justify-center"
      style={{
        backgroundColor: "rgba(6, 78, 59, 0.6)",
        borderColor: "rgba(4, 120, 87, 0.7)",
        color: "rgba(236, 253, 245, 1)",
        width: "auto",
        minWidth: "36px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(6, 78, 59, 0.8)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(6, 78, 59, 0.6)";
      }}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-4 w-4" style={{ color: "rgba(236, 253, 245, 1)" }} />
      ) : (
        <Moon className="h-4 w-4" style={{ color: "rgba(236, 253, 245, 1)" }} />
      )}
    </button>
  );
}
