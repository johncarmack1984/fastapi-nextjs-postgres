import { type Comment as CommentType } from "@/lib/api/client/requests";

export const childrenAfterTheirParent = (a: CommentType, b: CommentType) => {
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
