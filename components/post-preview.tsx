import Link from "next/link";
import { usePostsServiceReadPostKey } from "@/client/queries";
import { Post } from "@/client/requests/models/Post";
import { PostsService } from "@/client/requests/services/PostsService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ReactTimeAgo from "react-time-ago";

import { HeartIcon } from "./icons/heart-icon";
import { ReplyIcon } from "./icons/reply-icon";
import { SaveIcon } from "./icons/save-icon";
import { Button } from "./ui/button";

function HugPostButton({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const queryKey = [usePostsServiceReadPostKey, { id }];

  const onSuccess = (data: Post) => {
    queryClient.setQueryData(queryKey, data);
  };

  const { mutate } = useMutation({
    mutationFn: PostsService.hugPost,
    onSuccess,
  });

  const { num_hugs } = queryClient.getQueryData<Post>(queryKey) ?? {
    num_hugs: undefined,
  };
  return (
    <Button
      onClick={() => mutate(id)}
      variant="ghost"
      className="flex items-center space-x-2"
    >
      <HeartIcon className="size-4" />
      <span>{num_hugs} Hugs</span>
    </Button>
  );
}

export function PostPreview({
  id,
  post_url,
  title,
  created_at,
  patient_description,
  assessment,
  question,
  comments,
}: Post) {
  return (
    <div key={`post-${id}-preview`} className="rounded-lg bg-white p-6 shadow">
      <Link href={`/community/post/${post_url}`}>
        <h2 className=" text-[22px] font-semibold tracking-wide">{title}</h2>
        {question?.length ? (
          <p className="mt-2 line-clamp-4 text-sm text-gray-600">
            <strong>Question: </strong>
            {question}
          </p>
        ) : null}
        <p className="mt-2 line-clamp-4 text-sm text-gray-600">
          <strong>Patient Description: </strong>
          {patient_description}
        </p>
      </Link>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <HugPostButton id={id} />
          <Button variant="ghost" className="flex items-center space-x-2 ">
            <ReplyIcon className="size-4" />
            <span>{comments?.length} Comments</span>
          </Button>
          <Button
            variant="ghost"
            className="hover:decoration-none flex items-center space-x-2 p-0"
          >
            <SaveIcon className="size-4" />
            Save
          </Button>
        </div>
        <ReactTimeAgo
          className="text-sm font-semibold text-gray-400"
          date={new Date(created_at)}
        />
      </div>
    </div>
  );
}
