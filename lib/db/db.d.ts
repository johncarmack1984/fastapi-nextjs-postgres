import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface AuxhealthComments {
  created_at: Timestamp;
  display_name: string;
  id: Generated<number>;
  num_hugs: Generated<number>;
  parent_id: number | null;
  post_id: number;
  text: string;
}

export interface AuxhealthPosts {
  assessment: string;
  created_at: Timestamp;
  id: Generated<number>;
  num_hugs: number;
  patient_description: string;
  post_url: string;
  question: string | null;
  title: string;
}

export interface DB {
  auxhealth_comments: AuxhealthComments;
  auxhealth_posts: AuxhealthPosts;
}
