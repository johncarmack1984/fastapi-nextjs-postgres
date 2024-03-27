import { Comment as CommentType } from "@/lib/api/client/requests";
import { SelectCommentSchema } from "@/lib/validate/comments";
import { ReplyIcon } from "@/components/icons/reply-icon";
import { AccordionTrigger } from "@/components/ui/accordion";

function CommentsButton({ comments }: { comments?: SelectCommentSchema[] }) {
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
