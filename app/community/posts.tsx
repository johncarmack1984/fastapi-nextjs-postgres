"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { usePostsServiceReadPostsKey } from "@/client/queries";
import { PostPreview } from "@/components/post-preview";
import { Suspense, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { PostsService } from "@/client/requests/services/PostsService";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  usePostsServiceReadPostKey,
  usePostsServiceReadPosts,
} from "@/client/queries";

export function Posts() {
  const { ref, inView } = useInView();
  const getPosts = async ({ pageParam = 0 }: { pageParam?: number }) => {
    const posts = await PostsService.readPosts(pageParam, 10);
    return { posts, pageParam };
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [usePostsServiceReadPostsKey],
    queryFn: getPosts,
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) => firstPage.pageParam ?? undefined,
    getNextPageParam: (lastPage) => lastPage.pageParam + lastPage.posts.length,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const queryClient = new QueryClient();

  const hugPostMutation = useMutation({
    mutationFn: async function hugPost(id: number) {
      return await PostsService.hugPost(id);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [usePostsServiceReadPostsKey],
      });
    },
  });

  return (
    <div className="flex-col w-full lg:w-[500px] flex-auto flex gap-4">
      <Suspense fallback={<div>Loading...</div>}>
        {data?.pages.map((group) =>
          group.posts.map((post) => (
            <PostPreview
              key={post.id}
              hugPostMutation={hugPostMutation}
              {...post}
            />
          ))
        )}
        <div>
          <button
            ref={ref}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading more..." : hasNextPage ? "" : ""}
          </button>
        </div>
        <div>
          {isFetching && !isFetchingNextPage ? "Background Updating..." : null}
        </div>
      </Suspense>
    </div>
  );
}
