import { Link as SolitoLink } from 'solito/link'
import React, { useEffect } from 'react'
import { Center, Text } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reduxApi } from '@infor/services'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../redux/store';
import SignUp from '../signUp';

export function HomeScreen() {
  const state = useTypedSelector((state: any) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    const data = reduxApi.user.getUserLocalStorage()
    console.log('useEffect: getUserLocalStorage => ', data)
    
    dispatch(data)
  }, [dispatch])

  if (state.user.isLoading) {
    return <Text>Carregando...</Text>
  }

  return (
    <SignUp />
  )
}
