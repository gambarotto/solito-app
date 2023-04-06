import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeScreen } from '../../features/home/screen'
import { UserDetailScreen } from '../../features/user/detail-screen'
import SignIn from '../../features/signIn'
import SignUp from '../../features/signUp'

const Stack = createNativeStackNavigator<{
  home: undefined
  'user-detail': {
    id: string
  }
  signIn: undefined
  signUp: undefined
}>()

export function NativeNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
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
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="user-detail" component={UserDetailScreen} />
    </Stack.Navigator>
  )
}
