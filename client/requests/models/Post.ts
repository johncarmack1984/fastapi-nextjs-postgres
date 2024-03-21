/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Comment } from './Comment';
export type Post = {
    post_url: string;
    title: string;
    created_at: string;
    num_hugs: number;
    patient_description: string;
    assessment: string;
    question?: (string | null);
    id: number;
    comments?: Array<Comment>;
};

