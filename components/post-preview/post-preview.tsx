import Link from "next/link";
import { usePostsServiceReadPostKey } from "@/client/queries";
import { Post } from "@/client/requests/models/Post";
import { PostsService } from "@/client/requests/services/PostsService";

import ButtonRow from "@/components/button-row";
import EngagementRow from "@/components/engagement-row";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import CommentsButton from "../buttons/comments-button";
import { HugButton } from "../buttons/hug-button";
import SaveButton from "../buttons/save-button";
import { Comments } from "../comments";
import TimeAgo from "../time-ago";
import TextBlock, { BlockType, TextBlockProps } from "./text-block";

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
  // prettier-ignore
  const textBlocks: TextBlockProps[] = [
    { id, type: "question" as BlockType, children: question },
    { id, type: "patient_description" as BlockType, children: patient_description },
    { id, type: "assessment" as BlockType, children: assessment },
  ];

  return (
    <Accordion
      type="multiple"
      key={`post-${id}-preview`}
      className="rounded-lg bg-white p-6 shadow"
    >
      <Link
        href={`/community/post/${post_url}`}
        className=" text-[22px] font-semibold tracking-wide transition-[decoration] hover:underline"
      >
        {title}
      </Link>
      {textBlocks.map(TextBlock)}
      <AccordionItem
        value={`post-${id}-comments-accordion`}
        className="border-transparent"
      >
        <EngagementRow>
          <ButtonRow>
            <HugButton
              id={id}
              mutationFn={PostsService.hugPost}
              queryKey={[usePostsServiceReadPostKey, { id }]}
            />
            <CommentsButton comments={comments} />
            <SaveButton />
          </ButtonRow>
          <TimeAgo date={created_at} />
        </EngagementRow>
        <Comments comments={comments} />
      </AccordionItem>
    </Accordion>
  );
}
