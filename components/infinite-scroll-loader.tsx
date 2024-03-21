import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

function InfiniteScrollLoader({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: ReturnType<typeof useInfiniteQuery>) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [fetchNextPage, inView]);
  return (
    <button ref={ref} disabled={!hasNextPage || isFetchingNextPage}>
      {isFetchingNextPage ? "Loading..." : hasNextPage ? "" : ""}
    </button>
  );
}

export default InfiniteScrollLoader;
