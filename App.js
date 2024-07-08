import React, { useEffect, useState } from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
// import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './src/components/firebase'
import ToastManager, { toast } from 'toastify-react-native'
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
        <ToastManager />
      </NavigationContainer>
    </Provider>
  )
}

// npm install @react-native-async-storage/async-storage @react-native-community/masked-view @react-navigation/bottom-tabs @react-navigation/material-bottom-tabs @react-navigation/native @react-navigation/stack expo expo-cli expo-status-bar firebase react react-dom react-google-button react-native react-native-gesture-handler react-native-paper react-native-reanimated react-native-safe-area-context react-native-screens react-native-status-bar-height react-native-vector-icons react-native-web react-toastify

// npx expo install @react-native-async-storage/async-storage@1.17.11 expo-status-bar@~1.4.4 react@18.2.0 react-dom@18.2.0 react-native@0.71.14 react-native-gesture-handler@~2.9.0 react-native-reanimated@~2.14.4 react-native-safe-area-context@4.5.0 react-native-screens@~3.20.0 react-native-web@~0.18.10 @babel/core@^7.20.0
