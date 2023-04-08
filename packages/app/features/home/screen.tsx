import { Link as SolitoLink } from 'solito/link'
import React, { useEffect } from 'react'
import { Text } from 'native-base'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../redux/store';
import { getUserLocalStorage } from '@infor/services/redux/features/user/userSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Todo from '../todo';
import SignIn from '../signIn';


export function HomeScreen() {
  const state = useTypedSelector((state: any) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    async function save() {
      /* await AsyncStorage.setItem(
        '@infor:user',
        JSON.stringify({
          user: { id: 'id-criado', name: 'teste', email: 'hh@gg.com' },
          token: 'ujyhjkll.',
          isLoading: false,
        })
      )
      await AsyncStorage.setItem(
        '@infor:token',
        JSON.stringify({ token: 'oi' })
      ) */
      await AsyncStorage.multiRemove(['@infor:token', '@infor:user'])
    }
    //save();

    dispatch<any>(getUserLocalStorage())
  }, [dispatch])

  if (state.user.isLoading) {
    return <Text>Carregando...</Text>
  }

  return (
    <>{state.user.user.token ? <Todo /> : <SignIn />}</>
  )
}
