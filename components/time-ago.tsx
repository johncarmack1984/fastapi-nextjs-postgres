import ReactTimeAgo from "react-time-ago";

function TimeAgo({ date }: { date: string }) {
  return (
    <ReactTimeAgo
      className="text-sm font-semibold text-gray-400"
      date={new Date(date)}
    />
  );
}

export default TimeAgo;
