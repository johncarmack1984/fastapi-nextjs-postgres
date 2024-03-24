import { cn } from "@/lib/strings";

export default function p({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p
      {...props}
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
    >
      {children}
    </p>
  );
}
