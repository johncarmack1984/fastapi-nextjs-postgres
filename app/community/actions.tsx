"use server";

import { selectPostsSchema } from "../validate";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/api/posts"
    : "/api/posts";

async function getPosts({ pageParam = 0 }: { pageParam: number }) {
  return await fetch(`${url}?skip=${pageParam * 10}&limit=${10}`, {})
    .then((res) => res.json())
    .then(selectPostsSchema.parseAsync);
}

export { getPosts };
