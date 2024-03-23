import { AccordionTrigger } from "@radix-ui/react-accordion";

import { titleCase } from "@/lib/utils";
import { AccordionItem } from "@/components/ui/accordion";
import { Badge } from "../ui/badge";

function TextBlock({
  id,
  type,
  children,
}: {
  id: number;
  type: "question" | "patient_description" | "assessment";
  children: React.ReactNode;
}) {
  if (!children) return null;
  const displayType = titleCase(type);
  return (
    <AccordionItem className="border-transparent" value={`post-${id}-${type}`}>
      <AccordionTrigger className=" text-left">
        <article className="mt-2 line-clamp-4 text-sm text-gray-600">
          <Badge variant="secondary" className="capitalize">
            {displayType}:{" "}
          </Badge>
          {/* <AccordionContent className="!data-[state=closed]:animate-preview-accordion-up !data-[state=open]:animate-preview-accordion-down data-[state=closed]:line-clamp-4"> */}
          {children}
          {/* </AccordionContent>/ */}
        </article>
      </AccordionTrigger>
    </AccordionItem>
  );
}

export default TextBlock;
