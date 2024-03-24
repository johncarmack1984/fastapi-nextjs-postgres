"use client";

import { cn } from "@/lib/strings";

export default function ul({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"li">) {
  return (
    <li className={cn(" list-item", className)} {...props}>
      {children}
    </li>
  );
}
