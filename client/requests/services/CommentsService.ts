/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Comment } from '../models/Comment';
import type { CommentCreate } from '../models/CommentCreate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CommentsService {
    /**
     * Read Comments
     * @param postId
     * @returns Comment Successful Response
     * @throws ApiError
     */
    public static readComments(
        postId: number,
    ): CancelablePromise<Array<Comment>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/posts/{post_id}/comments',
            path: {
                'post_id': postId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Comment
     * @param postId
     * @param requestBody
     * @returns Comment Successful Response
     * @throws ApiError
     */
    public static createComment(
        postId: number,
        requestBody: CommentCreate,
    ): CancelablePromise<Comment> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/posts/{post_id}/comments',
            path: {
                'post_id': postId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Hug Comment
     * @param commentId
     * @returns Comment Successful Response
     * @throws ApiError
     */
    public static hugComment(
        commentId: number,
    ): CancelablePromise<Comment> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/comments/{comment_id}/hug',
            path: {
                'comment_id': commentId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Comment
     * @param commentId
     * @param requestBody
     * @returns Comment Successful Response
     * @throws ApiError
     */
    public static updateComment(
        commentId: number,
        requestBody: CommentCreate,
    ): CancelablePromise<Comment> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/comments/{comment_id}',
            path: {
                'comment_id': commentId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Comment
     * @param commentId
     * @returns Comment Successful Response
     * @throws ApiError
     */
    public static deleteComment(
        commentId: number,
    ): CancelablePromise<Comment> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/comments/{comment_id}',
            path: {
                'comment_id': commentId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
