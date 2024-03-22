import { Comment as CommentType } from "@/client/requests";

import Comment from "./comment";
import { AccordionContent } from "./ui/accordion";

const childrenAfterTheirParent = (a: CommentType, b: CommentType) => {
  if (a.parent_id === null && b.parent_id === null) {
    return a.id - b.id;
  } else if (a.parent_id === null) {
    return -1;
  } else if (b.parent_id === null) {
    return 1;
  } else {
    return a.id - b.id;
  }
};

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
