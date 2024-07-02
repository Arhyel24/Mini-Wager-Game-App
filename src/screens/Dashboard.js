import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeScreen from './HomeScreen'

const Tab = createBottomTabNavigator()

export default function Dashboard({ navigation }) {
  
  return (
    <Tab.Navigator 
        initialRouteName="Home"
        screenOptions={{headerShown: false}} 
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{title: "Home", 
          TabBarIcon: ({size, color}) => (
              <MaterialCommunityIcons name="home" size={size} color={color} />
              )
        }}
      />
      <Tab.Screen 
        name="History" 
        component="History" 
        options={{title: "History", 
          TabBarIcon: ({size, color}) => (
              <MaterialCommunityIcons name="receipt-outline" size={size} color={color} />
              )
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component="Profile" 
        options={{title: "Profile", 
          TabBarIcon: ({size, color}) => (
              <MaterialCommunityIcons name="account" size={size} color={color} />
              )
        }}
      />
    </Tab.Navigator>
  )
}
