import { HeartIcon } from "./icons/heart-icon";
import { ReplyIcon } from "./icons/reply-icon";

export type CommentProps = {
  id: number;
  parent_id: number;
  display_name: string;
  text: string;
  created_at: string;
};

export function Comments() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold">3 Comments</h2>
      <div className="space-y-4 mt-4">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Madelyn</h3>
            <span className="text-sm text-gray-500">17 ds ago</span>
          </div>
          <p className="mt-1">
            My brother had TMJ disorder similar to what you&apos;re describing
            and found PT really useful. He had to try a few different places
            tho, you just gotta find a good one
          </p>
          <div className="flex items-center mt-2">
            <HeartIcon className="text-gray-500 mr-1" />
            <span className="text-sm mr-4">1 Hugs</span>
            <ReplyIcon className="text-gray-500 mr-1" />
            <span className="text-sm">Reply</span>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Jessica</h3>
            <span className="text-sm text-gray-500">18 ds ago</span>
          </div>
          <p className="mt-1">
            I&apos;ve had similar issues all my life, i think
            massages/myofascial release therapy is the only thing that has
            helped
          </p>
          <div className="flex items-center mt-2">
            <HeartIcon className="text-gray-500 mr-1" />
            <span className="text-sm mr-4">2 Hugs</span>
            <ReplyIcon className="text-gray-500 mr-1" />
            <span className="text-sm">Reply</span>
          </div>
        </div>
        <div className="border-l-4 border-blue-600 pl-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-blue-600">Archie</h3>
            <span className="text-sm text-gray-500">18 ds ago</span>
          </div>
          <p className="mt-1">
            I tried this before, it helped in the moment but not really later.
            did a bunch of PT as well
          </p>
          <div className="flex items-center mt-2">
            <HeartIcon className="text-gray-500 mr-1" />
            <span className="text-sm mr-4">1 Hugs</span>
            <ReplyIcon className="text-gray-500 mr-1" />
            <span className="text-sm">Reply</span>
          </div>
        </div>
      </div>
    </div>
  );
}
