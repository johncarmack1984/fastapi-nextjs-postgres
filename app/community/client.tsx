"use client";

import { PostPreview } from "@/app/community/post-preview";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import {
  useCommentsServiceReadCommentsKey,
  usePostsServiceReadPostKey,
  usePostsServiceReadPostsKey,
} from "@/lib/api/client/queries";
import InfiniteScrollLoader from "@/components/infinite-scroll-loader";
import { SelectPostsSchema } from "../validate";
import { getPosts } from "./actions";

export default function CommunityPageClient() {
  const queryClient = useQueryClient();

  const infinitePosts = useInfiniteQuery({
    queryFn: async ({ pageParam = 0 }: { pageParam?: number }) => {
      const posts = await getPosts({ pageParam });

      posts.forEach((post) => {
        console.log("adding post to cache", post.id);

        queryClient.setQueryData(
          [usePostsServiceReadPostKey, { id: post.id }],
          post,
        );

        post.comments?.forEach((comment) => {
          console.log("adding comment to cache", comment.id);
          queryClient.setQueryData(
            [useCommentsServiceReadCommentsKey, { id: comment.id }],
            comment,
          );
        });
      });

      return posts;
    },
    queryKey: [usePostsServiceReadPostsKey],
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage?.length === 0) return undefined;
      return lastPageParam + 1;
    },
  });

  const renderPage = (page: SelectPostsSchema) => page.map(PostPreview);

  return (
    <div className="flex w-full flex-auto flex-col gap-4 lg:w-[500px]">
      {infinitePosts.data?.pages.map(renderPage)}
      <InfiniteScrollLoader {...infinitePosts} />
    </div>
  );
}
