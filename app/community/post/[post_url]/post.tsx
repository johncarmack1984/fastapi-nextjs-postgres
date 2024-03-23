"use client";

import type { QueryKey } from "@/app/api";
import { useQueryClient } from "@tanstack/react-query";

import { usePostsServiceReadPostKey } from "@/lib/api/client/queries";
import { PostsService, type Post as PostType } from "@/lib/api/client/requests";
import { childrenAfterTheirParent } from "@/lib/arrays";
import { HugButton } from "@/components/buttons/hug-button";
import Comment from "@/components/comment";
import EngagementRow from "@/components/engagement-row";
import TextBlock, {
  BlockType,
  TextBlockProps,
} from "@/components/post-preview/text-block";
import TimeAgo from "@/components/time-ago";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Post({
  title,
  num_hugs,
  patient_description,
  assessment,
  question,
  id,
  comments,
  created_at,
}: PostType) {
  const queryKey: QueryKey = [usePostsServiceReadPostKey, { id }];
  const data = { id, num_hugs };

  const queryClient = useQueryClient();
  queryClient.setQueryData(queryKey, data);

  // prettier-ignore
  const textBlocks: TextBlockProps[] = [
    { id, type: "question" as BlockType, children: question },
    { id, type: "patient_description" as BlockType, children: patient_description },
    { id, type: "assessment" as BlockType, children: assessment },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Card className="rounded-lg bg-white p-6 shadow">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <TimeAgo date={created_at} />
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {textBlocks.map(TextBlock)}
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
    </div>
  );
}
