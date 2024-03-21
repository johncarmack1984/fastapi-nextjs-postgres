/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Post } from '../models/Post';
import type { PostCreate } from '../models/PostCreate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PostsService {
    /**
     * Read Posts
     * @param skip
     * @param limit
     * @returns Post Successful Response
     * @throws ApiError
     */
    public static readPosts(
        skip?: number,
        limit: number = 10,
    ): CancelablePromise<Array<Post>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/posts',
            query: {
                'skip': skip,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Post
     * @param requestBody
     * @returns Post Successful Response
     * @throws ApiError
     */
    public static createPost(
        requestBody: PostCreate,
    ): CancelablePromise<Post> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/posts',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Post
     * @param postId
     * @returns Post Successful Response
     * @throws ApiError
     */
    public static readPost(
        postId: number,
    ): CancelablePromise<Post> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/posts/{post_id}',
            path: {
                'post_id': postId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Post
     * @param postId
     * @param requestBody
     * @returns Post Successful Response
     * @throws ApiError
     */
    public static updatePost(
        postId: number,
        requestBody: PostCreate,
    ): CancelablePromise<Post> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/posts/{post_id}',
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
     * Delete Post
     * @param postId
     * @returns Post Successful Response
     * @throws ApiError
     */
    public static deletePost(
        postId: number,
    ): CancelablePromise<Post> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/posts/{post_id}',
            path: {
                'post_id': postId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Hug Post
     * @param postId
     * @returns Post Successful Response
     * @throws ApiError
     */
    public static hugPost(
        postId: number,
    ): CancelablePromise<Post> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/posts/{post_id}/hug',
            path: {
                'post_id': postId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
