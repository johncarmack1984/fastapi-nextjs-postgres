"use client";

import { useQueryClient } from "@tanstack/react-query";

import { QueryKey } from "@/lib/api/api";
import { useCommentsServiceReadCommentsKey } from "@/lib/api/client/queries";
import {
  CommentsService,
  Comment as CommentType,
} from "@/lib/api/client/requests";
import { cn } from "@/lib/strings";
import ButtonRow from "./button-row";
import { HugButton } from "./buttons/hug-button";
import ReplyButton from "./buttons/reply-button";
import EngagementRow from "./engagement-row";
import TimeAgo from "./time-ago";
import { CardHeader } from "./ui/card";
import Large from "./ui/typography/large";
import P from "./ui/typography/p";
import Strong from "./ui/typography/strong";

function Comment({
  id,
  display_name,
  text,
  created_at,
  parent_id,
  post_id,
  num_hugs,
  ...comment
}: CommentType) {
  const queryKey: QueryKey = [useCommentsServiceReadCommentsKey, { id }];
  const data = { id, num_hugs };

  const queryClient = useQueryClient();
  queryClient.setQueryData(queryKey, data);
  // this block for matching the author to
  // the post when a user model exists
  // const post = queryClient.getQueryData<Post>([
  //   usePostsServiceReadPostKey,
  //   { id: post_id },
  // ]);
  /* <pre>{JSON.stringify(post, null, 2)}</pre> */
  return (
    <article
      key={`comment-${id}`}
      className={cn(
        "m-0 p-0 [&:not(:first-child)]:mt-5",
        parent_id && "border-l-4 border-blue-600 pl-4",
      )}
    >
      <CardHeader className="m-0 flex flex-row items-center justify-start gap-5 p-0">
        <Large className={cn("m-0 p-0", parent_id && "text-blue-600")}>
          {display_name}
        </Large>
        <TimeAgo className="m-0 !my-2 p-0" date={created_at} />
      </CardHeader>
      <P className=" m-0 !mt-0.5 p-0 leading-5">{text}</P>
      <EngagementRow className="m-0 p-0">
        <ButtonRow className="m-0 p-0">
          <HugButton
            id={id}
            mutationFn={CommentsService.hugComment}
            queryKey={queryKey}
            className="m-0 p-0"
          />
          <ReplyButton />
        </ButtonRow>
      </EngagementRow>
    </article>
  );
}

export default Comment;
