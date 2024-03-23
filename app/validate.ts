// import { evaluate, MDXRemote } from "next-mdx-remote-client/rsc";
// import { serialize } from "next-mdx-remote-client/serialize";
import { z } from "zod";

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

export const selectPostSchema = z.object({
  ...postSchema.shape,
  created_at: dateStringSchema,
  // assessment: z.string().transform((str) => serialize(str)),
});
