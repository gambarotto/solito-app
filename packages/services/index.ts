import { signUpValidation, signInValidation } from "./user";
import { configurationStore } from './redux/storeConfiguration';
import { 
  useTasksQuery, 
  useAddTaskMutation, 
  useUpdateTaskMutation, 
  useDeleteTaskMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetUserQuery,
  useCreateSessionMutation 
} from './redux/features/reduxApi';
import { getAsyncUser, getUserLocalStorage, selectUser, signIn, signOut } from './redux/features/user/userSlice';

const reduxApi = {
  configurationStore,
  tasks: {
    useTasksQuery,
    useAddTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation
  },
  user: {
    getUserLocalStorage,
    useCreateUserMutation,
    useUpdateUserMutation,
    useGetUserQuery,
    selectUser, 
    useCreateSessionMutation,
    signIn,
    signOut,
    getAsyncUser
  },
}

export { 
  signUpValidation, 
  signInValidation,
  reduxApi
}