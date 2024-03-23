import { type Post as PostType } from "@/client/requests";

import Post from "./post";

const apiUrl =
  process.env.NODE_ENV === "development" ? "http://127.0.0.1:8000/api" : "/api";

export async function generateStaticParams() {
  const posts: PostType[] = [];

  try {
    const res = await fetch(`${apiUrl}/posts?skip=0&limit=100`);

    posts.push(...(await res.json()));
  } catch (error) {
    console.error(error);
  }

  return posts.map((post) => ({
    post_url: post.post_url,
  }));
}

async function getPost(post_url: string): Promise<PostType> {
  const post: PostType = await fetch(`${apiUrl}/posts/url/${post_url}`).then(
    (res) => res.json(),
  );

  return post;
}

export default async function PostPage({
  params: { post_url },
}: {
  params: { post_url: string };
}) {
  const post = await getPost(post_url);

  return <Post {...post} />;
}
