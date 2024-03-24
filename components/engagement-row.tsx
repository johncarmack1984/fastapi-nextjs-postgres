import { cva } from "class-variance-authority";

import { cn } from "@/lib/strings";

export const engagementRowVariants = cva(
  "mt-4 flex items-center justify-between",
);

function EngagementRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(engagementRowVariants(), className)}>{children}</div>
  );
}

export default EngagementRow;
