"use server";

import { SelectPostsSchema, selectPostsSchema } from "@/lib/validate/posts";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/api/posts"
    : "/api/posts";

async function getPosts({
  pageParam = 0,
}: {
  pageParam: number;
}): Promise<ReturnType<typeof selectPostsSchema.parseAsync>> {
  const posts: SelectPostsSchema = await fetch(
    `${url}?skip=${pageParam * 10}&limit=${10}`,
    {},
  )
    .then((res) => res.json())
    .then(async (posts) => await selectPostsSchema.parseAsync(posts));
  return posts;
}

export { getPosts };
