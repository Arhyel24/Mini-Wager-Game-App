import React, { useEffect, useState } from 'react'
import Background from '../components/Background-sm'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../components/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Search from '../components/Search'
import { Image, SafeAreaView, ScrollView } from 'react-native'
import { PaperProvider, Card } from 'react-native-paper'
import Profile from '../components/ProfileScreen'

export default function ProfileScreen({ navigation }) {
  const [userDetails, setUserDetails] = useState({ name: 'App' })
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user)
      const docRef = doc(db, 'Users', user.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setUserDetails(docSnap.data())

        const jsonValue = JSON.stringify(docSnap.data())
        await AsyncStorage.setItem('user', jsonValue)

        console.log(docSnap.data())
      } else {
        console.log('User is not logged in')
      }
    })
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const user = {
    name: `${userDetails.name}`,
    email: `${userDetails.email}`,
    profileImage:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fdepositphotos.com%2Fvectors%2Favatar-placeholder.html&psig=AOvVaw2B4wTT7aLg6WrMpUdDZ_St&ust=1720134828867000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJCf0d7_i4cDFQAAAAAdAAAAABAE',
    amountEarned: '$500',
    totalChallenges: 20,
  }

  async function handleLogout() {
    try {
      await auth.signOut()
      await AsyncStorage.clear()
      navigation.reset({
        index: 0,
        routes: [{ name: 'StartScreen' }],
      })
    } catch (error) {
      console.error('Error logging out', error.message)
    }
  }

  return (
    <Background>
      {userDetails ? (
        <Profile user={user} />
      ) : (
        <Paragraph>Loading...</Paragraph>
      )}
    </Background>
  )
}
