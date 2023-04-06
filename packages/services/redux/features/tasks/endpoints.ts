import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta
} from "@reduxjs/toolkit/query/react";
import { TaskProps } from "../../../types";

type BuilderType = EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "user" | "tasks", "apiSlice">

export const tasksEndpoints = (builder: BuilderType) => {
  return {
    tasks: builder.query<TaskProps[], []>({
      query: () => "/task",
      providesTags: ["tasks"]
    }),
    addTask: builder.mutation({
      query: (content: string) => ({
        url: "/task",
        method: "POST",
        body: {
          content,
        }
      }),
      invalidatesTags: ["tasks"]
    }),
    updateTask: builder.mutation({
      query: ({ id, ...rest }: TaskProps) => ({
        url: `/task/${id}`,
        method: "PUT",
        body: {
          content: rest.content,
          done: rest.done
        }
      }),
      invalidatesTags: ["tasks"]
    }),
    deleteTask: builder.mutation({
      query: ({ id }: TaskProps) => ({
        url: `/task/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["tasks"]
    })
  }
}

