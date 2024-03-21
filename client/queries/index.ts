// generated with @7nohe/openapi-react-query-codegen@0.5.3 
import { useQuery, useMutation, UseQueryResult, UseQueryOptions, UseMutationOptions, UseMutationResult } from "@tanstack/react-query";
import { ValidationError } from "../requests/models/ValidationError";
import { PostCreate } from "../requests/models/PostCreate";
import { Post } from "../requests/models/Post";
import { HTTPValidationError } from "../requests/models/HTTPValidationError";
import { CommentCreate } from "../requests/models/CommentCreate";
import { Comment } from "../requests/models/Comment";
import { PostsService } from "../requests/services/PostsService";
import { CommentsService } from "../requests/services/CommentsService";
export type PostsServiceReadPostsDefaultResponse = Awaited<ReturnType<typeof PostsService.readPosts>>;
export type PostsServiceReadPostsQueryResult<TData = PostsServiceReadPostsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const usePostsServiceReadPostsKey = "PostsServiceReadPosts";
/**
 * Read Posts
 */
export const usePostsServiceReadPosts = <TData = PostsServiceReadPostsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ skip, limit }: {
    skip?: number;
    limit?: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [usePostsServiceReadPostsKey, ...(queryKey ?? [{ skip, limit }])], queryFn: () => PostsService.readPosts(skip, limit) as TData, ...options });
export type PostsServiceCreatePostMutationResult = Awaited<ReturnType<typeof PostsService.createPost>>;
/**
 * Create Post
 */
export const usePostsServiceCreatePost = <TData = PostsServiceCreatePostMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    requestBody: PostCreate;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    requestBody: PostCreate;
}, TContext>({ mutationFn: ({ requestBody }) => PostsService.createPost(requestBody) as unknown as Promise<TData>, ...options });
export type PostsServiceHugPostMutationResult = Awaited<ReturnType<typeof PostsService.hugPost>>;
/**
 * Hug Post
 */
export const usePostsServiceHugPost = <TData = PostsServiceHugPostMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    postId: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    postId: number;
}, TContext>({ mutationFn: ({ postId }) => PostsService.hugPost(postId) as unknown as Promise<TData>, ...options });
export type PostsServiceReadPostDefaultResponse = Awaited<ReturnType<typeof PostsService.readPost>>;
export type PostsServiceReadPostQueryResult<TData = PostsServiceReadPostDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const usePostsServiceReadPostKey = "PostsServiceReadPost";
/**
 * Read Post
 */
export const usePostsServiceReadPost = <TData = PostsServiceReadPostDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ postId }: {
    postId: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [usePostsServiceReadPostKey, ...(queryKey ?? [{ postId }])], queryFn: () => PostsService.readPost(postId) as TData, ...options });
export type PostsServiceUpdatePostMutationResult = Awaited<ReturnType<typeof PostsService.updatePost>>;
/**
 * Update Post
 */
export const usePostsServiceUpdatePost = <TData = PostsServiceUpdatePostMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    postId: number;
    requestBody: PostCreate;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    postId: number;
    requestBody: PostCreate;
}, TContext>({ mutationFn: ({ postId, requestBody }) => PostsService.updatePost(postId, requestBody) as unknown as Promise<TData>, ...options });
export type PostsServiceDeletePostMutationResult = Awaited<ReturnType<typeof PostsService.deletePost>>;
/**
 * Delete Post
 */
export const usePostsServiceDeletePost = <TData = PostsServiceDeletePostMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    postId: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    postId: number;
}, TContext>({ mutationFn: ({ postId }) => PostsService.deletePost(postId) as unknown as Promise<TData>, ...options });
export type CommentsServiceReadCommentsDefaultResponse = Awaited<ReturnType<typeof CommentsService.readComments>>;
export type CommentsServiceReadCommentsQueryResult<TData = CommentsServiceReadCommentsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useCommentsServiceReadCommentsKey = "CommentsServiceReadComments";
/**
 * Read Comments
 */
export const useCommentsServiceReadComments = <TData = CommentsServiceReadCommentsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ postId }: {
    postId: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn" | "initialData">) => useQuery<TData, TError>({ queryKey: [useCommentsServiceReadCommentsKey, ...(queryKey ?? [{ postId }])], queryFn: () => CommentsService.readComments(postId) as TData, ...options });
export type CommentsServiceCreateCommentMutationResult = Awaited<ReturnType<typeof CommentsService.createComment>>;
/**
 * Create Comment
 */
export const useCommentsServiceCreateComment = <TData = CommentsServiceCreateCommentMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    postId: number;
    requestBody: CommentCreate;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    postId: number;
    requestBody: CommentCreate;
}, TContext>({ mutationFn: ({ postId, requestBody }) => CommentsService.createComment(postId, requestBody) as unknown as Promise<TData>, ...options });
export type CommentsServiceUpdateCommentMutationResult = Awaited<ReturnType<typeof CommentsService.updateComment>>;
/**
 * Update Comment
 */
export const useCommentsServiceUpdateComment = <TData = CommentsServiceUpdateCommentMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    commentId: number;
    requestBody: CommentCreate;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    commentId: number;
    requestBody: CommentCreate;
}, TContext>({ mutationFn: ({ commentId, requestBody }) => CommentsService.updateComment(commentId, requestBody) as unknown as Promise<TData>, ...options });
export type CommentsServiceDeleteCommentMutationResult = Awaited<ReturnType<typeof CommentsService.deleteComment>>;
/**
 * Delete Comment
 */
export const useCommentsServiceDeleteComment = <TData = CommentsServiceDeleteCommentMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
    commentId: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
    commentId: number;
}, TContext>({ mutationFn: ({ commentId }) => CommentsService.deleteComment(commentId) as unknown as Promise<TData>, ...options });
