import ReactTimeAgo from "react-time-ago";

import { cn } from "@/lib/strings";
import { mutedVariants } from "./ui/typography/muted";

function TimeAgo({ date, className }: { date: string; className?: string }) {
  return (
    <ReactTimeAgo
      className={cn(mutedVariants(), className)}
      date={new Date(date)}
    />
  );
}

export default TimeAgo;
