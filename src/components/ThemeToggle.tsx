import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="group relative flex h-8 items-center gap-1.5 rounded-full border border-border bg-card/60 px-2.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground backdrop-blur-sm transition-all duration-200 hover:border-ember/60 hover:bg-card/90 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ember active:scale-95"
    >
      <span className="relative flex h-4 w-4 items-center justify-center">
        {isDark ? (
          <Moon className="h-3.5 w-3.5 text-ice transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
        ) : (
          <Sun className="h-3.5 w-3.5 text-ember transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110" />
        )}
      </span>
      <span className="hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-foreground sm:inline-block">
        {isDark ? "Dark" : "Light"}
      </span>
    </button>
  );
}
