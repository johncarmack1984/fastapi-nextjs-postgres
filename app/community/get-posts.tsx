import { infiniteQueryOptions } from "@tanstack/react-query";

import { usePostsServiceReadPostsKey } from "@/lib/api/client/queries";
import { Post } from "@/lib/api/client/requests/models/Post";
import { PostsService } from "@/lib/api/client/requests/services/PostsService";

const usePosts = async ({ pageParam = 0 }: { pageParam?: number }) => {
  const posts = await PostsService.readPosts(pageParam * 10, 10);
  return posts;
};

type QueryPostsFn = ({
  pageParam,
}: {
  pageParam?: number | undefined;
}) => Promise<Post[]>;

function useInfinitePostsOptions(queryFn: QueryPostsFn = usePosts) {
  return infiniteQueryOptions({
    queryFn,
    queryKey: [usePostsServiceReadPostsKey],
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage?.length === 0) return undefined;
      return lastPageParam + 1;
    },
  });
}

export { usePosts, useInfinitePostsOptions };
