import { cn } from "@/lib/strings";

export default function UL({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"ul">) {
  return (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)} {...props}>
      {children}
    </ul>
  );
}
