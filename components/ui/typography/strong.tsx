import { cn } from "@/lib/strings";

export default function Strong({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"strong">) {
  return (
    <strong
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    >
      {children}
    </strong>
  );
}
