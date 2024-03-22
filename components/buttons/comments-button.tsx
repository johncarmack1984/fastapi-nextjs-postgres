import { Comment as CommentType } from "@/client/requests";

import { ReplyIcon } from "@/components/icons/reply-icon";
import { AccordionTrigger } from "@/components/ui/accordion";

function CommentsButton({ comments }: { comments?: CommentType[] }) {
  comments = comments || [];
  const enabled = comments.length;
  return (
    <AccordionTrigger
      disabled={!enabled}
      className="flex items-center space-x-2 "
    >
      <ReplyIcon className="size-4" />
      <span>{comments.length} Comments</span>
    </AccordionTrigger>
  );
}

export default CommentsButton;
