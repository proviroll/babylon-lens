"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";


export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="flex cursor-pointer items-center justify-center text-muted-foreground hover:text-foreground"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </div>
  );
}
