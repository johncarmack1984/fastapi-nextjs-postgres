import CommunityPageClient from "./client";

export default async function CommunityPageServer({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  return <CommunityPageClient />;
}
