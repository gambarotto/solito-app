import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiSlice } from './features/reduxApi';
import { UserStateProps } from "./features/user/userSlice";
import userReducer from './features/user/userSlice';
import { TypedUseSelectorHook, useSelector } from "react-redux";
import thunkMiddleware from 'redux-thunk';


export type RootState = {
  [apiSlice.reducerPath]: ReturnType<typeof apiSlice.reducer>;
  user: UserStateProps;
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
};
const persisterReducer = persistReducer(persistConfig, userReducer);
export const configurationStore = {
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: persisterReducer,
  },
  middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}).concat(thunkMiddleware).concat(apiSlice.middleware)
}
