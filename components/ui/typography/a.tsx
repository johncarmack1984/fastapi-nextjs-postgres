import Link from "next/link";

import { cn } from "@/lib/strings";
import { Button } from "../button";

export default function a({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"a">) {
  const Comp = !!props.href && props.href?.startsWith("/") ? Link : "a";
  return (
    // @ts-expect-error
    <Comp
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    >
      {children}
    </Comp>
  );
}
