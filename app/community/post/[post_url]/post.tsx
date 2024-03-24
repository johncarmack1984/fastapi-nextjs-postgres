"use client";

import { SelectPostSchema } from "@/app/validate";
import { useQueryClient } from "@tanstack/react-query";

import type { QueryKey } from "@/lib/api/api";
import { usePostsServiceReadPostKey } from "@/lib/api/client/queries";
import { PostsService } from "@/lib/api/client/requests";
import { childrenAfterTheirParent } from "@/lib/arrays";
import { HugButton } from "@/components/buttons/hug-button";
import Comment from "@/components/comment";
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

  const mdxBlocks = [
    { ...question },
    { ...patient_description },
    { ...assessment },
  ];

  return (
    <PostAndComments>
      <Card className="rounded-lg bg-white p-6 shadow">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <TimeAgo date={created_at} />
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {mdxBlocks.map(MDXClient)}
        </CardContent>
        <EngagementRow>
          <CardDescription>
            <HugButton
              id={id}
              mutationFn={PostsService.hugPost}
              queryKey={queryKey}
            />
          </CardDescription>
        </EngagementRow>
      </Card>
      <Card className="p-6">
        <CardHeader>
          <CardDescription>{comments?.length ?? 0} comments</CardDescription>
        </CardHeader>
        <CardContent className="">
          {comments?.sort(childrenAfterTheirParent).map(Comment)}
        </CardContent>
      </Card>
    </PostAndComments>
  );
}
