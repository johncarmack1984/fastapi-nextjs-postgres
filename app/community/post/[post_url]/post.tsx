"use client";

import { useQueryClient } from "@tanstack/react-query";

import type { QueryKey } from "@/lib/api/api";
import { usePostsServiceReadPostKey } from "@/lib/api/client/queries";
import { PostsService } from "@/lib/api/client/requests";
import { childrenAfterTheirParent } from "@/lib/arrays";
import { SelectPostSchema } from "@/lib/validate/posts";
import { HugButton } from "@/components/buttons/hug-button";
import Comment from "@/components/comments/comment";
import CommentForm from "@/components/comments/comment-form";
import EngagementRow from "@/components/engagement-row";
import MDXClient from "@/components/mdx/mdx-client";
import TimeAgo from "@/components/time-ago";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function PostAndComments({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-6">{children}</div>;
}

export default function Post({
  title,
  num_hugs,
  patient_description,
  assessment,
  question,
  id,
  comments,
  created_at,
}: SelectPostSchema) {
  const queryKey: QueryKey = [usePostsServiceReadPostKey, { id }];
  const data = { id, num_hugs };

  const queryClient = useQueryClient();
  queryClient.setQueryData(queryKey, data);

  return (
    <PostAndComments>
      <Card className="rounded-lg bg-white p-2 shadow">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <TimeAgo date={created_at} />
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {[{ ...question }, { ...patient_description }, { ...assessment }].map(
            MDXClient,
          )}
        </CardContent>
        <EngagementRow>
          <CardDescription className="p-1">
            <HugButton
              id={id}
              mutationFn={PostsService.hugPost}
              queryKey={queryKey}
            />
          </CardDescription>
        </EngagementRow>
      </Card>
      <Card className="">
        <CardHeader>
          {/* <CommentForm post_id={id} parent_id={null} /> */}
          <CardDescription>{comments?.length ?? 0} comments</CardDescription>
        </CardHeader>
        <CardContent className="">
          {/* {comments?.sort(childrenAfterTheirParent).map(Comment)} */}
        </CardContent>
      </Card>
    </PostAndComments>
  );
}
