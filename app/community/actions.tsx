"use client";

import { SelectPostsSchema, selectPostsSchema } from "@/lib/validate/posts";

async function getPosts({
  pageParam = 0,
}: {
  pageParam: number;
}): Promise<ReturnType<typeof selectPostsSchema.parseAsync>> {
  const posts: SelectPostsSchema = await fetch(
    `${process.env.PROTOCOL}://${process.env.VERCEL_URL}/api/posts?skip=${pageParam * 10}&limit=${10}`,
  )
    .then((res) => res.json())
    .then(async (posts) => await selectPostsSchema.parseAsync(posts));
  return posts;
}

export { getPosts };
