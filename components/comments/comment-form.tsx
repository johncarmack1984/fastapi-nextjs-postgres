"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  useCommentsServiceReadCommentsKey,
  usePostsServiceReadPostsKey,
} from "@/lib/api/client/queries";
import { CommentsService } from "@/lib/api/client/requests/services/CommentsService";
import { PostsService } from "@/lib/api/client/requests/services/PostsService";
import {
  InsertCommentSchema,
  insertCommentSchema,
} from "@/lib/validate/comments";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import Code from "../ui/typography/code";
import Lead from "../ui/typography/lead";

export default function CommentForm({
  post_id,
  parent_id,
}: {
  post_id: InsertCommentSchema["post_id"];
  parent_id: InsertCommentSchema["parent_id"];
}) {
  const queryClient = useQueryClient();

  // const mutation = useMutation({
  //   mutationFn: async (
  //     data: Awaited<ReturnType<typeof insertCommentSchema.parseAsync>>,
  //   ) => await CommentsService.createComment(post_id, data),
  //   onError: (error, variables, context) => {
  //     toast({
  //       title: "An error occurred when adding your comment:",
  //       description: (
  //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //           <Code className="text-white">{JSON.stringify(error, null, 2)}</Code>
  //           <Code className="text-white">
  //             {JSON.stringify(variables, null, 2)}
  //           </Code>
  //           <Code className="text-white">
  //             {JSON.stringify(context, null, 2)}
  //           </Code>
  //         </pre>
  //       ),
  //       variant: "destructive",
  //     });
  //   },
  //   onSettled: async (data, error, variables, context) => {
  //     const post = await PostsService.readPost(post_id);
  //     queryClient.setQueryData(
  //       [usePostsServiceReadPostsKey, { id: post_id }],
  //       post,
  //     );
  //   },
  //   onSuccess: (data, variables, context) => {
  //     queryClient.invalidateQueries({
  //       queryKey: [usePostsServiceReadPostsKey, { id: post_id }],
  //     });
  //     queryClient.setQueryData(
  //       [useCommentsServiceReadCommentsKey, { id: data.id }],
  //       data,
  //     );
  //   },
  // });

  const form = useForm<z.infer<typeof insertCommentSchema>>({
    resolver: zodResolver(insertCommentSchema),
    defaultValues: {
      display_name: "",
      text: "",
      post_id,
      parent_id,
      created_at: new Date().toISOString(),
      num_hugs: 0,
    },
  });

  function onSubmit(data: z.infer<typeof insertCommentSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <Code className="text-white">{JSON.stringify(data, null, 2)}</Code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <Lead className=" !mb-0 mt-5 !pb-0 ">Leave a comment</Lead>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-4 px-2"
      >
        <FormField
          control={form.control}
          name="display_name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="What's your name?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="What's on your mind?'"
                  className=""
                  {...field}
                />
              </FormControl>
              <Button variant="secondary" type="submit">
                Submit
              </Button>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
