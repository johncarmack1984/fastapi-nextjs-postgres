import { cn } from "@/lib/strings";

export default function H2({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"h4">) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </h4>
  );
}
