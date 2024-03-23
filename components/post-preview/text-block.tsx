"use client";

import { usePathname } from "next/navigation";
import { cva } from "class-variance-authority";

// import { MDXClient } from "next-mdx-remote-client/csr";

import { cn, titleCase } from "@/lib/strings";
import { Badge } from "../ui/badge";

export type BlockType = "question" | "patient_description" | "assessment";

export type TextBlockProps = {
  id: number;
  type: BlockType;
  children: React.ReactNode;
};

const textBlockVariants = cva(
  "mt-2 break-before-all whitespace-pre-wrap text-gray-600",
  {
    variants: {
      isPreview: {
        true: "line-clamp-4 text-sm",
        false: "whitespace-pre-wrap",
      },
    },
  },
);

const textBlockBadgeVariants = cva("w-fit capitalize", {
  variants: {
    isPreview: {
      true: "",
      false: "block p-0 bg-transparent mb-4 text-lg font-bold text-gray-800",
    },
  },
});

function TextBlock({ id, type, children }: TextBlockProps) {
  const isPreview =
    usePathname()
      .split("/")
      .findLast((x) => x) === "community";
  if (!children) return null;
  const displayType = titleCase(type);
  const markdown = children.toString();
  return (
    <article
      key={`${id}-${type}`}
      className={cn(textBlockVariants({ isPreview }))}
    >
      <Badge
        variant="secondary"
        className={cn(textBlockBadgeVariants({ isPreview }))}
      >
        {displayType}:{" "}
      </Badge>
      {/* <MDXRemote source={markdown} /> */}
      {children}
    </article>
  );
}

export default TextBlock;
