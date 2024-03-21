import Link from "next/link";
import { HeartIcon } from "./icons/heart-icon";
import { ReplyIcon } from "./icons/reply-icon";
import { Button } from "./ui/button";
import { Post } from "@/client/requests/models/Post";
import ReactTimeAgo from "react-time-ago";
import { SaveIcon } from "./icons/save-icon";
import { UseMutationResult } from "@tanstack/react-query";

export function PostPreview({
  id,
  post_url,
  title,
  created_at,
  num_hugs,
  patient_description,
  assessment,
  question,
  comments,
  hugPostMutation,
}: Post & {
  hugPostMutation: UseMutationResult<Post, Error, number, unknown>;
}) {
  const onSubmit = () => {
    hugPostMutation.mutate(id);
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <Link href={`/community/post/${post_url}`}>
        <h2 className=" text-[22px] tracking-wide font-semibold">{title}</h2>
        {question?.length ? (
          <p className="mt-2 text-sm text-gray-600 line-clamp-4">
            <strong>Question: </strong>
            {question}
          </p>
        ) : null}
        <p className="mt-2 text-sm text-gray-600 line-clamp-4">
          <strong>Patient Description: </strong>
          {patient_description}
        </p>
      </Link>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center text-sm text-gray-500 space-x-2">
          <Button
            onClick={onSubmit}
            variant="ghost"
            className="flex items-center space-x-2"
          >
            <HeartIcon className="size-4" />
            <span>{num_hugs} Hugs</span>
          </Button>
          <Button variant="ghost" className="flex items-center space-x-2 ">
            <ReplyIcon className="size-4" />
            <span>{comments?.length} Comments</span>
          </Button>
          <Button
            variant="ghost"
            className="flex hover:decoration-none items-center space-x-2 p-0"
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
