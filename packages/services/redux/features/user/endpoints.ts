import {  SessionUser, SignInProps, SignUpProps, UserProps } from '@infor/services/types';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query';
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

type BuilderType = EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, "user" | "tasks", "apiSlice">

export const userEndpoints = (builder: BuilderType) => {
  return {
    getUser: builder.query<UserProps | null, string>({
      query: (id: string) => `/user/${id}`,
      providesTags: ["user"]
    }),
    createUser: builder.mutation({
      query: (signUpData: SignUpProps) => ({
        url: "/user",
        method: "POST",
        body: signUpData
      }),
      invalidatesTags: ["user"]
    }),
    updateUser: builder.mutation<UserProps, UserProps>({
      query: ({id, name, email}: UserProps) => ({
        url: `/user/${id}`,
        method: "PUT",
        body: {
          name,
          email
        }
      }),
      invalidatesTags: ["user"]
    }),
    deleteUser: builder.mutation({
      query: ({ id }: UserProps) => ({
        url: `/user/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["user"]
    }),
    createSession: builder.mutation<SessionUser, SignInProps>({
      query: (signInData: SignInProps) => ({
        url: "/session",
        method: "POST",
        body: signInData
      }),
      invalidatesTags: ["user"],
      
    }),
    deleteSession: builder.mutation({
      query: ({ id }: UserProps) => ({
        url: `/user/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["user"]
    })
  }
}

