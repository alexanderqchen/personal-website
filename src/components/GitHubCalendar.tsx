import { GitHubCalendar } from "react-github-calendar";
import { useState, useEffect } from "react";
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
  const [totalCount, setTotalCount] = useState<number | null>(null);

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
        showTotalCount={false}
        transformData={(data) => {
          const total = data.reduce((sum, d) => sum + d.count, 0);
          setTotalCount(total);
          return data;
        }}
        renderBlock={(block, activity: Activity) => (
          <g>
            <title>{`${formatDate(activity.date)}: ${activity.count} contribution${activity.count !== 1 ? "s" : ""}`}</title>
            {block}
          </g>
        )}
      />
      {totalCount !== null && (
        <p style={{ fontSize: 12, marginTop: 8, color: "inherit", opacity: 0.7 }}>
          {totalCount.toLocaleString()} contributions in the last year
        </p>
      )}
    </div>
  );
}
