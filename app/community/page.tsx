"use client";

import { usePostsServiceReadPostKey } from "@/client/queries";
import { Post, PostsService } from "@/client/requests";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import InfiniteScrollLoader from "@/components/infinite-scroll-loader";
import { PostPreview } from "@/components/post-preview";
import { useInfinitePostsOptions } from "./getPosts";

export default function PostsPage() {
  const queryClient = useQueryClient();
  const queryFn = async ({ pageParam = 0 }: { pageParam?: number }) => {
    const posts = await PostsService.readPosts(pageParam * 10, 10);
    posts.forEach((post) => {
      queryClient.setQueryData(
        [usePostsServiceReadPostKey, { id: post.id }],
        post,
      );
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
