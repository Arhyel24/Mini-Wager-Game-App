import React, { useEffect, useState } from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
// import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './src/components/firebase'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
} from './src/screens'
import ChallengeScreen from './src/screens/ChallengeScreen'
// import AsyncStorage from '@react-native-async-storage/async-storage'

const Stack = createStackNavigator()

// const [user, setUser] = useState()
export default function App() {
  // const [user, setUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(async (user) => {
  //     if (user) {
  //       //Store user info
  //       await AsyncStorage.setItem('user', JSON.stringify(user))
  //       console.log(user)
  //       setUser(user)
  //     } else {
  //       //User is signed out clear storage
  //       await AsyncStorage.removeItem('user')
  //       setUser(null)
  //     }
  //   })
  //   return unsubscribe
  // }, [])

  auth.onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  })

  // useEffect(() => {
  //   const loadUser = async () => {
  //     const storedUser = await AsyncStorage.getItem('user')
  //     const user = JSON.parse(storedUser)
  //     //Sign in silently
  //     await signInWithEmailAndPassword(auth, user.email, '123456')
  //     setLoggedIn(true)
  //   }
  //   loadUser()
  // }, [])

  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          // initialRouteName="StartScreen"
          initialRouteName={loggedIn ? 'Dashboard' : 'StartScreen'}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="ChallengeScreen" component={ChallengeScreen} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
