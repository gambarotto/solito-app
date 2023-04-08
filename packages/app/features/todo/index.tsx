import { AddIcon, Box, Button, HStack, Heading, Input, ScrollView, Text, VStack } from "native-base";
import React, { useCallback, useState } from "react";
import ItemList from "../../components/ItemList";
import { reduxApi } from "@infor/services";
import { RootState } from "@infor/services/redux/storeConfiguration";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "solito/router";
import { useTypedSelector } from "../../redux/store";

const WIDTH = 310
const MAXWIDTH = 400
const MINWIDTH = 300

export default function Todo() {
  const [newTask, setNewTask] = useState('')
  const { user } = useTypedSelector((state: RootState) => state)
  const state = useSelector((state) => state)
  const router = useRouter()
  const dispatch = useDispatch()

  const {
    data: tasks,
    isLoading,
    isError,
    isSuccess,
  } = reduxApi.tasks.useTasksQuery([])

  const [addTask] = reduxApi.tasks.useAddTaskMutation()

  const handleCreateTask = useCallback(() => {
    try {
      addTask(newTask)
      setNewTask('')
    } catch (error) {
      console.log(error);
    }
  }, [addTask, newTask])

  const handleLogout = useCallback(() => {
    dispatch(reduxApi.user.signOut())
    router.push('/')
  }, [dispatch, router])

  if (isLoading) {
    return <Text>loading</Text>
  }
  if (isError) {
    return <Text>error</Text>
  }
  return (
    <Box flex="1" safeAreaTop>
      <VStack
        space={2.5}
        w="100%"
        h="100%"
        px="3"
        alignItems="center"
        paddingTop={24}
      >
        <VStack width={WIDTH} alignItems="flex-start" marginBottom={2}>
          <HStack
            width="100%"
            justifyContent="space-between"
            alignItems="center"
          >
            <Heading size="md">Olá {'Diego'}</Heading>
            <Button variant="unstyled" onPress={handleLogout}>
              Sair
            </Button>
          </HStack>
          <Text marginBottom={1} color="gray.400" style={{ fontSize: 12 }}>
            Adicione suas tarefas aqui.
          </Text>
        </VStack>
        <HStack w={WIDTH}>
          <Input
            variant="underlined"
            placeholder="Nova tarefa"
            value={newTask}
            onChangeText={setNewTask}
            flex="1"
            InputRightElement={
              <Button variant="unstyled" onPress={handleCreateTask}>
                <AddIcon size="4" color="blue.400" />
              </Button>
            }
          />
        </HStack>
        <ScrollView w={WIDTH}>
          {isSuccess &&
            tasks.map((item, i) => <ItemList key={item.id} task={item} />)}
        </ScrollView>
      </VStack>
    </Box>
  )
}