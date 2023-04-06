import {
  createApi,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { tasksEndpoints } from "./tasks/endpoints";
import { userEndpoints } from "./user/endpoints";
import { KEY_LOCALSTORAGE_TOKEN } from "./user/userSlice";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.15.139:3333/",
    prepareHeaders: async (headers, { getState }) => {

      let tokenStorage: string | Promise<string | null> | null;
      if(typeof window.localStorage !== "undefined") {
        tokenStorage = window.localStorage.getItem(KEY_LOCALSTORAGE_TOKEN);
       
      } else {
        tokenStorage = await AsyncStorage.getItem(KEY_LOCALSTORAGE_TOKEN)
      } 

      if(!tokenStorage) return headers

      const token = JSON.parse(tokenStorage)
      headers.set("authorization", `Bearer ${token}`);
      return headers;
    }
  }),
  tagTypes: ["user","tasks"],
  endpoints: (builder) => (
      {
        ...tasksEndpoints(builder),
        ...userEndpoints(builder),
      }
    )
})

export const {
  useTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useCreateSessionMutation,
  
} = apiSlice;