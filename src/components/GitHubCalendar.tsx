import { GitHubCalendar } from "react-github-calendar";

export default function GitHubActivity() {
  return (
    <div className="overflow-x-auto">
      <GitHubCalendar
        username="alexanderqchen"
        colorScheme="light"
        fontSize={12}
        blockSize={11}
        blockMargin={3}
      />
    </div>
  );
}
