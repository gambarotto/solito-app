import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeScreen } from '../../features/home/screen'
import { UserDetailScreen } from '../../features/user/detail-screen'
import SignIn from '../../features/signIn'
import SignUp from '../../features/signUp'
import Todo from '../../features/todo'

const Stack = createNativeStackNavigator<{
  home: undefined
  'user-detail': {
    id: string
  }
  signIn: undefined
  signUp: undefined
  todo: undefined
}>()

export function NativeNavigation() {
  return (
    <Stack.Navigator
      initialRouteName='home'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen
        name="signIn"
        component={SignIn}
        options={{ title: 'Sign In' }}
      />
      <Stack.Screen
        name="signUp"
        component={SignUp}
        options={{ title: 'Sign Up' }}
      />
      <Stack.Screen name="todo" component={Todo} options={{ title: 'To-do' }} />
      <Stack.Screen name="user-detail" component={UserDetailScreen} />
    </Stack.Navigator>
  )
}
