import Post from "../../pages/Posts/model";
import { api } from "./app";

type PostsResponse = Post[];

export const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<PostsResponse, void>({
      query: () => "posts",
      transformResponse: (res: Post[]) =>
        res.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "Post", id } as const)),
        { type: "Post" as const, id: "LIST" }
      ]
    }),
    addPost: builder.mutation<Post, Partial<Post>>({
      query: (post: Post) => ({
        url: "posts",
        method: "POST",
        body: post
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }]
    }),
    updatePost: builder.mutation<Post, Partial<Post>>({
      query: (post: Post) => ({
        url: `posts/${post.id}`,
        method: "PATCH",
        body: post
      }),
      invalidatesTags: (post) => [{ type: "Post", id: post?.id }]
    }),
    deletePost: builder.mutation<PostsResponse, { id: number }>({
      query: ({ id }: { id: number }) => ({
        url: `posts/${id}`,
        method: "DELETE",
        body: id
      })
    })
  })
});

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation
} = postsApi;
