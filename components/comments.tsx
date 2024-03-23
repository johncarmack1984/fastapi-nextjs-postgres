import { Comment as CommentType } from "@/lib/api/client/requests";
import { childrenAfterTheirParent } from "@/lib/arrays";
import Comment from "./comment";
import { AccordionContent } from "./ui/accordion";

export function Comments({ comments }: { comments?: CommentType[] }) {
  if (!comments || comments.length === 0) return null;
  return (
    <AccordionContent className="rounded-lg bg-white p-6 shadow">
      <h2 className="text-lg font-semibold">{comments.length} Comments</h2>
      <div className="mt-4 space-y-4">
        {comments.sort(childrenAfterTheirParent).map(Comment)}
      </div>
    </AccordionContent>
  );
}
