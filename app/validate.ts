import { z } from "zod";

import { mdxSchema, sourceToMdx } from "@/lib/mdx";

const dateStringSchema = z.date().transform((date) => date.toISOString());

export const commentSchema = z.object({
  display_name: z.string(),
  text: z.string(),
  created_at: z.string(),
  num_hugs: z.number(),
  id: z.number(),
  parent_id: z.number().optional().nullable(),
  post_id: z.number(),
});

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
  created_at: dateStringSchema,
  patient_description,
  question,
  assessment,
});

export const selectPostsSchema = z.array(
  z.object({
    ...postSchema.shape,
    patient_description,
    question,
    assessment,
  }),
);

export type SelectPostSchema = z.infer<typeof selectPostSchema>;
export type SelectPostsSchema = z.infer<typeof selectPostsSchema>;
