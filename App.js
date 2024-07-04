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
import ChallengeScreen from './src/screens/ChallengeScreen'

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
          initialRouteName="StartScreen"
          // initialRouteName={user ? 'Dashboard' : 'StartScreen'}
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
        <ToastContainer />
      </NavigationContainer>
    </Provider>
  )
}

// npm install @react-native-async-storage/async-storage @react-native-community/masked-view @react-navigation/bottom-tabs @react-navigation/material-bottom-tabs @react-navigation/native @react-navigation/stack expo expo-cli expo-status-bar firebase react react-dom react-google-button react-native react-native-gesture-handler react-native-paper react-native-reanimated react-native-safe-area-context react-native-screens react-native-status-bar-height react-native-vector-icons react-native-web react-toastify

// npx expo install @react-native-async-storage/async-storage@1.17.11 expo-status-bar@~1.4.4 react@18.2.0 react-dom@18.2.0 react-native@0.71.14 react-native-gesture-handler@~2.9.0 react-native-reanimated@~2.14.4 react-native-safe-area-context@4.5.0 react-native-screens@~3.20.0 react-native-web@~0.18.10 @babel/core@^7.20.0
