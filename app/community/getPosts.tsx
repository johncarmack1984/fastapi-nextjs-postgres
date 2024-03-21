import { usePostsServiceReadPostsKey } from "@/client/queries";
import { Post } from "@/client/requests/models/Post";
import { PostsService } from "@/client/requests/services/PostsService";
import { infiniteQueryOptions } from "@tanstack/react-query";

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
      if (lastPage?.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });
}

export { usePosts, useInfinitePostsOptions };
