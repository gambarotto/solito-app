import { reduxApi } from "@infor/services";
import { TaskProps } from "@infor/services/types";
import { Button, Checkbox, HStack, Input, CloseIcon, Divider,  } from "native-base";
import React, { useCallback, useState } from "react";
//import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  task: TaskProps;
}

export default function ItemList ({ task }: Props) {
  const [isChecked,setIsChecked] = useState(task.done);
  const [isEditing, setIsEditing] = useState(false)
  const [inputText, setInputText] = useState(task.content)

   const [updateTask] = reduxApi.tasks.useUpdateTaskMutation()
   const [deleteTask] = reduxApi.tasks.useDeleteTaskMutation()

   const handleEdit = useCallback(() => {
     if (isEditing && inputText !== task.content) {
       updateTask({ ...task, content: inputText })
     }
     setIsEditing(!isEditing)
   }, [inputText, isEditing, task, updateTask])

   const handleCheckBox = useCallback(() => {
     const data = { ...task, done: !isChecked }

     updateTask(data)
     setIsChecked(!isChecked)
   }, [isChecked, task, updateTask])

   const handleDelete = useCallback(() => {
      deleteTask(task)
   }, [deleteTask, task]);
  return (
    <HStack h="50">
      <Input
        size="md"
        flex="1"
        variant="unstyled"
        placeholder="Unstyled"
        value={inputText}
        isReadOnly={!isEditing}
        textDecorationLine={isChecked ? 'line-through' : 'none'}
        onChangeText={(text) => setInputText(text)}
        InputLeftElement={
          <Checkbox
            value="task"
            isChecked={isChecked}
            onChange={handleCheckBox}
            accessibilityLabel="Eu fiz essa tarefa?"
          />
        }
        InputRightElement={
          <HStack>
            <Button
              size="sm"
              variant="unstyled"
              onPress={handleEdit}
              color="blue.500"
            >
              {isEditing ? 'Ok' : 'Edit'}
            </Button>
            <Divider orientation="vertical" />
            <Button
              size="sm"
              variant="unstyled"
              onPress={handleDelete}
              color="blue.500"
            >
              <CloseIcon size="3" color="red.500" />
            </Button>
          </HStack>
        }
      />
    </HStack>
  )
}