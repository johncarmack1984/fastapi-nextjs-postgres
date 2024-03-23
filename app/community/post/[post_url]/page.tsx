import db from "@/app/connectToDb";
import { jsonArrayFrom } from "kysely/helpers/postgres";

import Post from "./post";

export async function generateStaticParams() {
  const post_urls = await db
    .selectFrom("auxhealth_posts")
    .select(["post_url"])
    .execute();

  return post_urls.map(({ post_url }) => ({
    post_url,
  }));
}

export default async function PostPage({
  params: { post_url },
}: {
  params: { post_url: string };
}) {
  const post = await db
    .selectFrom("auxhealth_posts")
    .selectAll()
    .select((eb) => [
      jsonArrayFrom(
        eb
          .selectFrom("auxhealth_comments")
          .selectAll()
          .whereRef("auxhealth_posts.id", "=", "auxhealth_comments.post_id")
          .orderBy("created_at", "desc"),
      ).as("comments"),
    ])
    .where("post_url", "=", decodeURIComponent(post_url))
    .executeTakeFirstOrThrow()
    .then(({ created_at, ...post }) => ({
      ...post,
      created_at: String(created_at),
      comments: post.comments?.map(({ created_at, ...comment }) => ({
        ...comment,
        created_at: String(created_at),
      })),
    }));
  return <Post {...post} />;
}
