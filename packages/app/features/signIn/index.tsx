import { Box, Heading, Text, VStack } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { Link as SolitoLink } from 'solito/link'
import { ButtonBase, InputBase } from "../../components";
import { reduxApi, signInValidation } from "@infor/services";
import { useRouter } from "solito/router";
import { KEY_LOCALSTORAGE_TOKEN, KEY_LOCALSTORAGE_USER, getUserLocalStorage } from "@infor/services/redux/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAppDispatch } from "../../redux/store";


export default function SignIn(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const state = useSelector(state => state)
  const [createSession] = reduxApi.user.useCreateSessionMutation()

  const dispatch = useDispatch()

  const handleSignIn = useCallback(async () => {
    const user = signInValidation({ email, password })
    const session = await createSession(user).unwrap()
    console.log(session)

    dispatch(reduxApi.user.signIn(session))
    router.push('/todo')
  }, [createSession, dispatch, email, password, router])

  return (
    <Box flex="1" safeAreaTop>
      <VStack
        space={2.5}
        w="100%"
        h="100%"
        px="3"
        justifyContent="center"
        alignItems="center"
      >
        <Heading
          backgroundColor="amber.500"
          w="300px"
          marginBottom={2}
          size="md"
        >
          <Text>Sign In</Text>
        </Heading>
        <Text w="300px" color="gray.400" marginBottom={6}>
          Seja bem-vindo!
        </Text>
        <InputBase
          label="E-mail"
          textError="E-mail invalido"
          placeholder="E-mail"
          type="email"
          onChangeText={(text) => setEmail(text)}
        />
        <InputBase
          label="Senha"
          textError="Senha inválida"
          placeholder="Senha"
          type="password"
          onChangeText={(text) => setPassword(text)}
        />
        <ButtonBase
          text="Entrar"
          isLoading={false}
          isLoadingText="Entrando..."
          marginY={2}
          onPress={handleSignIn}
        />
        <SolitoLink href="/signUp">
          <Text w="300px" textAlign="right" color="blue.700" fontSize={14}>
            Ainda não tem uma conta? clique aqui
          </Text>
        </SolitoLink>
      </VStack>
    </Box>
  )
}