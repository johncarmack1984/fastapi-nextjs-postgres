import { HeartIcon } from "@/components/icons/heart-icon";
import { ReplyIcon } from "@/components/icons/reply-icon";
import { Button } from "@/components/ui/button";
import { Post } from "@/client/requests";

// export async function generateStaticParams() {
//   const posts = await fetch("/api/posts").then((res) => res.json());
//   return posts.map((post: Post) => ({
//     post_url: post.post_url,
//   }));
// }

export default function PostPage() {
  return <div className="bg-white p-6 rounded-lg shadow">Post</div>;
}
