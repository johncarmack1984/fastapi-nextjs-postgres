import { z } from "zod";

import { commentSchema } from "./comments";
import { mdxSchema } from "./mdx";

export const postSchema = z.object({
  post_url: z.string(),
  title: z.string(),
  created_at: z.string(),
  num_hugs: z.number(),
  patient_description: z.string(),
  assessment: z.string(),
  question: z.string().optional().nullable(),
  id: z.number(),
  comments: z.array(commentSchema).optional(),
});

const patient_description = mdxSchema({ title: "Patient Description" });
const question = mdxSchema({ title: "Question" });
const assessment = mdxSchema({ title: "Assessment" });

export const selectPostSchema = z.object({
  ...postSchema.shape,
  created_at: z.date().transform((date) => date.toISOString()),
  patient_description,
  question,
  assessment,
});

export const selectPostsSchema = z.array(
  z.object({
    ...selectPostSchema.shape,
    created_at: z.string(),
  }),
);

export type SelectPostSchema = z.infer<typeof selectPostSchema>;
export type SelectPostsSchema = z.infer<typeof selectPostsSchema>;
