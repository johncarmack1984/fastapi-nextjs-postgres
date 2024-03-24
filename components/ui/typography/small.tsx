import { cn } from "@/lib/strings";

export default function Small({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"small">) {
  return (
    <small
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    >
      {children}
    </small>
  );
}
