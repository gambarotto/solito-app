import { Box, Heading, Text, VStack } from "native-base";
import React, { useCallback, useState } from "react";
import { Link as SolitoLink } from 'solito/link'
import { useRouter } from 'solito/router'
import { InputBase, ButtonBase } from "../../components";
import { reduxApi, signUpValidation } from "@infor/services";
import { useDispatch } from "react-redux";

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const [createUser] = reduxApi.user.useCreateUserMutation()

  const handleSignUp = useCallback(async () => {
    const user = signUpValidation({name, email, password})
    try {
      await createUser(user).unwrap()
      router.push('/signIn')
    } catch (error) {
      console.log(error);
    }
  }, [createUser, email, name, password, router])

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
          w="300px"
          marginBottom={2}
          size="md"
        >
          <Text>Sign Up</Text>
        </Heading>
        <Text w="300px" color="gray.400" marginBottom={6}>
          Oba! será maravilhoso ter você com a gente!
        </Text>
        <InputBase
          label="Nome"
          textError="Nome é obrigatório"
          placeholder="Digite seu nome"
          type="name"
          onChangeText={(text) => setName(text)}
        />
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
          text="Criar Conta"
          isLoading={false}
          isLoadingText="Criando..."
          marginY={2}
          onPress={handleSignUp}
        />
        <SolitoLink href="/signIn">
          <Text w="300px" textAlign="right" color="blue.700" fontSize={14}>
            Voltar para login
          </Text>
        </SolitoLink>
      </VStack>
    </Box>
  )
  }