import { Comment as CommentType } from "@/lib/api/client/requests";
import { ReplyIcon } from "@/components/icons/reply-icon";
import { Button } from "../ui/button";

function ReplyButton() {
  return (
    <Button variant="ghost" className="flex items-center space-x-2 p-2">
      <ReplyIcon className="size-4" />
      <span>Reply</span>
    </Button>
  );
}

export default ReplyButton;
