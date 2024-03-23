import { useCommentsServiceReadCommentsKey } from "@/client/queries";
import { CommentsService, Comment as CommentType } from "@/client/requests";

import { cn } from "@/lib/utils";
import { HugButton } from "./buttons/hug-button";
import ReplyButton from "./buttons/reply-button";
import TimeAgo from "./time-ago";

function Comment({
  id,
  display_name,
  text,
  created_at,
  parent_id,
  post_id,
  ...comment
}: CommentType) {
  // this block for matching the author to
  // the post when a user model exists
  // const queryClient = useQueryClient();
  // const post = queryClient.getQueryData<Post>([
  //   usePostsServiceReadPostKey,
  //   { id: post_id },
  // ]);
  /* <pre>{JSON.stringify(post, null, 2)}</pre> */
  return (
    <article
      key={`comment-${id}`}
      className={cn(parent_id && "border-l-4 border-blue-600 pl-4")}
    >
      <header className="flex items-center justify-between">
        <h3 className={cn("font-semibold", parent_id && "text-blue-600")}>
          {display_name}
        </h3>
        <TimeAgo date={created_at} />
      </header>
      <p className="mt-1">{text}</p>
      <footer className="mt-2 flex items-center">
        <HugButton
          id={id}
          mutationFn={CommentsService.hugComment}
          queryKey={[useCommentsServiceReadCommentsKey, { id }]}
        />
        <ReplyButton />
      </footer>
    </article>
  );
}

export default Comment;