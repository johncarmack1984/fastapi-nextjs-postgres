import { cva } from "class-variance-authority";

import { cn } from "@/lib/strings";

export const buttonRowVariants = cva(
  "flex items-center space-x-2 text-xs text-gray-500 sm:text-sm",
);

function ButtonRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn(buttonRowVariants(), className)}>{children}</div>;
}

export default ButtonRow;
