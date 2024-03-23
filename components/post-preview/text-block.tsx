import { usePathname } from "next/navigation";
import { AccordionTrigger } from "@radix-ui/react-accordion";
import { cva } from "class-variance-authority";

import { cn, titleCase } from "@/lib/utils";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
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
  return (
    <Accordion key={`${id}-${type}`} type="single" collapsible={isPreview}>
      <AccordionItem
        key={`post-${id}-${type}`}
        className="border-transparent"
        value={`post-${id}-${type}`}
      >
        <AccordionTrigger className="text-left">
          <article className={cn(textBlockVariants({ isPreview }))}>
            <Badge
              variant="secondary"
              className={cn(textBlockBadgeVariants({ isPreview }))}
            >
              {displayType}:{" "}
            </Badge>
            {/* <AccordionContent className="!data-[state=closed]:animate-preview-accordion-up !data-[state=open]:animate-preview-accordion-down data-[state=closed]:line-clamp-4"> */}
            {children}
            {/* </AccordionContent>/ */}
          </article>
        </AccordionTrigger>
      </AccordionItem>
    </Accordion>
  );
}

export default TextBlock;
