import Link from "next/link";

import { usePostsServiceReadPostKey } from "@/lib/api/client/queries";
import { PostsService } from "@/lib/api/client/requests/services/PostsService";
import ButtonRow from "@/components/button-row";
import CommentsButton from "@/components/buttons/comments-button";
import { HugButton } from "@/components/buttons/hug-button";
import SaveButton from "@/components/buttons/save-button";
import { Comments } from "@/components/comments";
import EngagementRow from "@/components/engagement-row";
import MDXClient from "@/components/mdx/mdx-client";
import TimeAgo from "@/components/time-ago";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import H3 from "@/components/ui/typography/h3";
import H4 from "@/components/ui/typography/h4";
import { SelectPostSchema } from "../validate";

export function PostPreview({
  id,
  post_url,
  title,
  created_at,
  patient_description,
  assessment,
  question,
  comments,
}: SelectPostSchema) {
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
      className="rounded-lg bg-white p-6 shadow"
    >
      <Link href={`/community/post/${post_url}`}>
        <H4 className="transtion-colors w-fit border-b-2 border-transparent decoration-2 underline-offset-8 duration-150 ease-in-out hover:border-b-current">
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
        <Comments comments={comments} />
      </AccordionItem>
    </Accordion>
  );
}
