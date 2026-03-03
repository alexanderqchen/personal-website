import { GitHubCalendar } from "react-github-calendar";

// Only customize the "empty" square for light mode to match warm beige bg.
// Dark mode uses the default GitHub green-on-dark palette.
const lightTheme = {
  light: [
    "#ddd5c8", // empty — warm tan, matches page border color
    "#c6e48b",
    "#7bc96f",
    "#239a3b",
    "#196127",
  ],
};

export default function GitHubActivity() {
  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  return (
    <div className="overflow-x-auto">
      <GitHubCalendar
        username="alexanderqchen"
        theme={isDark ? undefined : lightTheme}
        colorScheme={isDark ? "dark" : "light"}
        fontSize={12}
        blockSize={11}
        blockMargin={3}
      />
    </div>
  );
}
