"use client";

import { usePathname } from "next/navigation";
import { cva } from "class-variance-authority";
import { CircleUserRound } from "lucide-react";
import { MDXClient as BaseMDXClient } from "next-mdx-remote-client";

import { MdxSchema } from "@/lib/mdx";
import { cn } from "@/lib/strings";
import { Badge } from "../ui/badge";
import Strong from "../ui/typography/strong";
import mdxComponents from "./mdx-components";
import MdxError from "./mdx-error";
import MdxSource from "./mdx-source";

const mdxBlockVariants = cva("my-4", {
  variants: {
    isPreview: {
      true: "inline text-sm *:inline *:*:inline *:text-sm *:*:*:inline *:*:*:*:inline *:mr-1 *:ml-0 *:mt-0 *:*:leading-none *:leading-none line-clamp-4 ",
      false: "",
    },
  },
  defaultVariants: {
    isPreview: true,
  },
});

const mdxBlockBadgeVariants = cva("w-fit capitalize", {
  variants: {
    isPreview: {
      true: "inline mr-2",
      false: "",
    },
  },
});

const MDXClient = (mdxSchema?: MdxSchema) => {
  const routename = usePathname()
    .split("/")
    .findLast((x) => x);
  if (!mdxSchema) return null;
  if (!mdxSchema?.serialized) return null;
  if (mdxSchema?.source?.length === 0) return null;
  const isPreview = routename === "community";
  const { props } = mdxSchema?.serialized?.scope ?? { props: {} };
  if ("error" in mdxSchema?.serialized)
    return (
      <>
        <MdxError error={mdxSchema?.serialized?.error} />
        <MdxSource source={mdxSchema?.source} />
        <span className="right-corner-absolute-note">
          <Strong>Syntax Error</Strong>
        </span>
      </>
    );
  const key = mdxSchema?.source
    .substring(0, 15)
    .replace(/\s/g, "")
    .toLowerCase();
  return (
    <article
      key={`mdx-block-${routename}-${key}`}
      className={cn(mdxBlockVariants({ isPreview }))}
    >
      <Badge
        variant="secondary"
        className={cn(mdxBlockBadgeVariants({ isPreview }))}
      >
        {props?.title}
      </Badge>
      <BaseMDXClient
        {...mdxSchema?.serialized}
        components={mdxComponents}
        onError={MdxError}
      />
    </article>
  );
};

export default MDXClient;
