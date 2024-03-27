import { z } from "zod";

import { dateStringSchema } from "./transforms";

export const commentSchema = z.object({
  display_name: z.string(),
  text: z.string(),
  created_at: z.string(),
  num_hugs: z.number(),
  id: z.number(),
  parent_id: z.number().nullable(),
  post_id: z.number(),
});

export const selectCommentSchema = z.object({
  ...commentSchema.shape,
  created_at: z.string(),
});

export const selectCommentsSchema = z.array(
  z.object({
    ...selectCommentSchema.shape,
    created_at: z.string(),
  }),
);

export type SelectCommentSchema = z.infer<typeof selectCommentSchema>;

export const insertCommentSchema = z
  .object({
    ...commentSchema.shape,
    created_at: z.string().transform(() => new Date().toISOString()),
    num_hugs: z.number().transform(() => 0),
  })
  .omit({ id: true });

export type InsertCommentSchema = z.infer<typeof insertCommentSchema>;
