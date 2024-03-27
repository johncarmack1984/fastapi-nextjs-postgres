import { SelectCommentSchema } from "@/lib/validate/comments";

export const childrenAfterTheirParent = (
  a: SelectCommentSchema,
  b: SelectCommentSchema,
) => {
  if (a.parent_id === null && b.parent_id === null) {
    return a.id - b.id;
  } else if (a.parent_id === null) {
    return -1;
  } else if (b.parent_id === null) {
    return 1;
  } else {
    return a.id - b.id;
  }
};
