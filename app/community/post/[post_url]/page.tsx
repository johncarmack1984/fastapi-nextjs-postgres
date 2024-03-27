import { jsonArrayFrom } from "kysely/helpers/postgres";

import db from "@/lib/db";
import { SelectPostSchema, selectPostSchema } from "@/lib/validate/posts";
import Post from "./post";

export async function generateStaticParams() {
  const post_urls = await db
    .selectFrom("auxhealth_posts")
    .select(["post_url"])
    .execute();

  return post_urls.slice(0, 10).map(({ post_url }) => ({
    post_url,
  }));
}

export default async function PostPage({
  params: { post_url },
}: {
  params: { post_url: string };
}) {
  const post: SelectPostSchema = await db
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
    .limit(1)
    .executeTakeFirstOrThrow()
    .then(selectPostSchema.parseAsync);
  return <Post {...post} />;
}
