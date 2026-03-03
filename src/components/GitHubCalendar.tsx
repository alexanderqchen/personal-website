import { GitHubCalendar } from "react-github-calendar";

const lightTheme = {
  light: [
    "#e8e2d8", // empty — warm tan matching beige page bg
    "#c6e48b",
    "#7bc96f",
    "#239a3b",
    "#196127",
  ],
};

const darkTheme = {
  dark: [
    "#252d3a", // empty — blue-tinted matching dark page bg
    "#0e4429",
    "#006d32",
    "#26a641",
    "#39d353",
  ],
};

export default function GitHubActivity() {
  // Read theme from html class (set by ThemeToggle)
  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  return (
    <div className="overflow-x-auto">
      <GitHubCalendar
        username="alexanderqchen"
        theme={isDark ? darkTheme : lightTheme}
        colorScheme={isDark ? "dark" : "light"}
        fontSize={12}
        blockSize={11}
        blockMargin={3}
      />
    </div>
  );
}
