import Link from "next/link";

import { usePostsServiceReadPostKey } from "@/lib/api/client/queries";
import { PostsService } from "@/lib/api/client/requests/services/PostsService";
import { childrenAfterTheirParent } from "@/lib/arrays";
import { SelectPostSchema, SelectPostsSchema } from "@/lib/validate/posts";
import ButtonRow from "@/components/button-row";
import CommentsButton from "@/components/buttons/comments-button";
import { HugButton } from "@/components/buttons/hug-button";
import SaveButton from "@/components/buttons/save-button";
import Comment from "@/components/comments/comment";
import CommentForm from "@/components/comments/comment-form";
import EngagementRow from "@/components/engagement-row";
import MDXClient from "@/components/mdx/mdx-client";
import TimeAgo from "@/components/time-ago";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import H4 from "@/components/ui/typography/h4";

export function PostPreview({
  id,
  post_url,
  title,
  created_at,
  patient_description,
  assessment,
  question,
  comments,
}: SelectPostsSchema[number]) {
  const mdxBlocks = [
    { ...patient_description },
    { ...question },
    { ...assessment },
  ];

  return (
    <Accordion
      type="single"
      key={`post-${id}-preview-comments`}
      collapsible
      className=" rounded-lg bg-white p-6 shadow"
    >
      <Link href={`/community/post/${post_url}`}>
        <H4 className="transtion-colors overflow-ellipsis underline decoration-transparent decoration-1 underline-offset-4 duration-150 ease-in-out hover:decoration-current">
          {title}
        </H4>
      </Link>
      {mdxBlocks.map(MDXClient)}
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
        <AccordionContent className=" border-t-[1px] border-solid border-border/50 bg-white pt-3 shadow">
          {comments?.sort(childrenAfterTheirParent).map(Comment)}
          <CommentForm post_id={id} parent_id={null} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
