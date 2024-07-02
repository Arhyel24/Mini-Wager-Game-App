import React, { useEffect, useState } from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import { auth } from './src/components/firebase'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
} from './src/screens'

const Stack = createStackNavigator()

// const [user, setUser] = useState()
export default function App() {
  const [user, setUser] = useState()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user)
    })
  }, [])

  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Dashboard"
          // initialRouteName={user ? 'Dashboard' : 'StartScreen'}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
        <ToastContainer />
      </NavigationContainer>
    </Provider>
  )
}
