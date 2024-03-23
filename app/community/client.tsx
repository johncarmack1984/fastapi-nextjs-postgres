"use client";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import {
  useCommentsServiceReadCommentsKey,
  usePostsServiceReadPostKey,
} from "@/lib/api/client/queries";
import { Post, PostsService } from "@/lib/api/client/requests";
import InfiniteScrollLoader from "@/components/infinite-scroll-loader";
import { PostPreview } from "@/components/post-preview/post-preview";
import { useInfinitePostsOptions } from "./get-posts";

export default function CommunityPageClient() {
  const queryClient = useQueryClient();

  const queryFn = async ({ pageParam = 0 }: { pageParam?: number }) => {
    const posts = await PostsService.readPosts(pageParam * 10, 10);

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
  };

  const infinitePosts = useInfiniteQuery(useInfinitePostsOptions(queryFn));

  const renderPage = (page: Post[]) => page.map(PostPreview);

  return (
    <div className="flex w-full flex-auto flex-col gap-4 lg:w-[500px]">
      {infinitePosts.data?.pages.map(renderPage)}
      <InfiniteScrollLoader {...infinitePosts} />
    </div>
  );
}
