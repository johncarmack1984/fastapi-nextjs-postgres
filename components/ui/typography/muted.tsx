import { cva } from "class-variance-authority";

import { cn } from "@/lib/strings";

export const mutedVariants = cva("text-sm text-muted-foreground");

export default function Muted({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p className={cn(mutedVariants(), className)} {...props}>
      {children}
    </p>
  );
}
