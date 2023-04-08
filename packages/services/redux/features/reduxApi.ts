import {
  createApi,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { tasksEndpoints } from "./tasks/endpoints";
import { userEndpoints } from "./user/endpoints";
import { KEY_LOCALSTORAGE_TOKEN } from "./user/userSlice";

const tempToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODA4OTc1MjYsImV4cCI6MTY4MzQ4OTUyNiwic3ViIjoiZDA4YzhkMGQtYWUwZS00MTAyLTkyZTQtOTU5N2Q1ZjAzZmI5In0.ZLafU6mgQUxvtApMzUwYOv-_lLL15ADAmzykXSX2Rs8'
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
      //headers.set("authorization", `Bearer ${tempToken}`);
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