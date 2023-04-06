import { SessionUser } from '@infor/services/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const KEY_LOCALSTORAGE_USER = '@infor:user';
export const KEY_LOCALSTORAGE_TOKEN = '@infor:token';

export interface User {
  id?: string;
  name: string;
  email: string;
}
export interface UserStateProps {
  user: User,
  token?: string;
  isLoading: boolean;
}

const initialState: UserStateProps = {
  user: {
    id: '',
    name: '',
    email: ''
  },
  token: '',
  isLoading: true,
}

export const getUserLocalStorage = createAsyncThunk(
  'user/getUserLocalStorage', 
  async (_, { rejectWithValue }) => {
  const emptyState = {
    user: {
      id: '',
      name: '',
      email: ''
    },
    token: '',
    isLoading: false
  }
  
  try {
    let userStorage: string | Promise<string | null> | null;
    let tokenStorage: string | Promise<string | null> | null;

    if (typeof window.localStorage !== 'undefined') {
      // WEB
      userStorage = window.localStorage.getItem(KEY_LOCALSTORAGE_USER);
      tokenStorage = window.localStorage.getItem(KEY_LOCALSTORAGE_TOKEN);
      console.log('WEB', userStorage, tokenStorage);
    } else {
      // REACT NATIVE
      userStorage = await AsyncStorage.getItem(KEY_LOCALSTORAGE_USER);
      tokenStorage = await AsyncStorage.getItem(KEY_LOCALSTORAGE_TOKEN);

      console.log('NATIVE' ,userStorage, tokenStorage);
      
    }
    if (!userStorage || !tokenStorage) {
      return emptyState as UserStateProps;
    } else {

      return {
        user: JSON.parse(userStorage),
        token: JSON.parse(tokenStorage),
        isLoading: false
      }
    }
  } catch (error) {
    return rejectWithValue(error)
  }
},)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, { payload: { user, token } }: PayloadAction<SessionUser>) => {
      //TODO: update user state
      state.user = user;
      // update token state
      state.token = token;
      //TODO: save data on local storage
      if (typeof window.localStorage !== 'undefined') {
        console.log(typeof window.localStorage);
        
        // WEB
        window.localStorage.setItem(KEY_LOCALSTORAGE_USER, JSON.stringify(state.user));
        window.localStorage.setItem(KEY_LOCALSTORAGE_TOKEN, JSON.stringify(state.token));
      } else {
        // REACT NATIVE
        AsyncStorage.setItem(KEY_LOCALSTORAGE_USER, JSON.stringify(state.user));
        AsyncStorage.setItem(KEY_LOCALSTORAGE_TOKEN, JSON.stringify(state.token));
      }
    },
    signOut: (state) => {
      if (typeof window.localStorage !== 'undefined') {
        window.localStorage.removeItem(KEY_LOCALSTORAGE_USER)
        window.localStorage.removeItem(KEY_LOCALSTORAGE_TOKEN)
      } else {
        AsyncStorage.multiRemove([KEY_LOCALSTORAGE_USER, KEY_LOCALSTORAGE_TOKEN])
      }

      state.user = initialState.user
      state.token = initialState.token
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getUserLocalStorage.fulfilled, (state, data) => {
      console.log('fulfilled', data);
      
      state.user = data.payload?.user as User;
      state.token = data.payload?.token as string;
      state.isLoading = false;
    })
    .addCase(getUserLocalStorage.rejected, (state, data) => {
      console.log('rejected', data);
      
      state.user = { id: '', name: '', email: ''}
      state.token = '',
      state.isLoading = false
    })
  },
})

export default userSlice.reducer
export const { signIn, signOut } = userSlice.actions

/**
 *     getUserLocalStorage: (state) => {
      const emptyState = {
        user: {
          id: '',
          name: '',
          email: ''
        },
        token: '',
        isLoading: false
      }
      let userStorage: string | Promise<string | null> | null;
      let tokenStorage: string | Promise<string | null> | null;

      if (typeof window.localStorage !== 'undefined') {
        // WEB
        userStorage = window.localStorage.getItem(KEY_LOCALSTORAGE_USER);
        tokenStorage = window.localStorage.getItem(KEY_LOCALSTORAGE_TOKEN);

      } else {
        // REACT NATIVE
        userStorage = AsyncStorage.getItem(KEY_LOCALSTORAGE_USER);
        tokenStorage = AsyncStorage.getItem(KEY_LOCALSTORAGE_TOKEN);
      }

      console.log(JSON.stringify(userStorage), JSON.stringify(tokenStorage));
      
      if (!userStorage || !tokenStorage) {
        state = emptyState as UserStateProps;
      }else {
        console.log(userStorage, tokenStorage);
        
        state.user = {
          id: '',
          name: '',
          email: ''
        } //JSON.parse(userStorage as string);
        state.token = 'token' //JSON.parse(tokenStorage as string);
        state.isLoading = false;
      }
    },
 */