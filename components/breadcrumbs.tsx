"use client";

import { Fragment } from "react";

import { cn } from "@/lib/strings";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function BreadcrumbsItem({
  segment,
  href,
  last,
}: {
  segment: string;
  href: string;
  last: boolean;
}) {
  const title = segment.replace(/\+/g, " ").replace(/-\d+$/, "");
  const Comp = last ? BreadcrumbPage : BreadcrumbLink;
  return (
    <Fragment key={`breadcrumb-${href}`}>
      <BreadcrumbItem>
        <Comp className={cn("capitalize")} href={href}>
          {title}
        </Comp>
      </BreadcrumbItem>
      {last ? null : <BreadcrumbSeparator />}
    </Fragment>
  );
}

function Breadcrumbs({ segments }: { segments: string[] }) {
  const length = segments.length;
  const toBreadCrumbs = (s: string, index: number) => {
    const segment = decodeURIComponent(s);
    return {
      href: `/${[...segments.slice(0, index), segment].join("/")}`,
      last: index === length - 1,
      segment,
    };
  };
  const home = {
    href: "/",
    last: false,
    segment: "Md&Me",
  };

  return (
    <Breadcrumb className="mb-0 p-4 pb-0">
      <BreadcrumbList>
        {[home, ...segments.map(toBreadCrumbs)].map(BreadcrumbsItem)}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default Breadcrumbs;
