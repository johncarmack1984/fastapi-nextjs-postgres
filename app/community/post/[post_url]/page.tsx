import { PostsService } from "@/client/requests";

// export async function generateStaticParams() {
//   const posts = await PostsService.readPosts();
//   return posts.map((post) => ({
//     post_url: post.post_url,
//   }));
// }

export default function PostPage({ params }: { params: { post_url: string } }) {
  // const { post_url } = params;
  return <div className="rounded-lg bg-white p-6 shadow">Post</div>;
}
