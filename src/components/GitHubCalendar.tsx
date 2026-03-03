import { GitHubCalendar } from "react-github-calendar";
import { useState, useEffect, cloneElement } from "react";
import type { Activity } from "react-activity-calendar";

const lightTheme = {
  light: [
    "#ddd5c8", // empty — warm tan matching page border color
    "#c6e48b",
    "#7bc96f",
    "#239a3b",
    "#196127",
  ],
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
}

export default function GitHubActivity() {
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="github-calendar-wrapper overflow-x-auto">
      <GitHubCalendar
        username="alexanderqchen"
        theme={isDark ? undefined : lightTheme}
        colorScheme={isDark ? "dark" : "light"}
        fontSize={12}
        blockSize={11}
        blockMargin={3}
        renderBlock={(block, activity: Activity) =>
          cloneElement(block, {}, (
            <title>
              {`${formatDate(activity.date)}: ${activity.count} contribution${activity.count !== 1 ? "s" : ""}`}
            </title>
          ))
        }
      />
    </div>
  );
}
