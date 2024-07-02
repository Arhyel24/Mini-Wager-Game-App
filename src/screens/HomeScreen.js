import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../components/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function HomeScreen({ navigation }) {
  const [userDetails, setUserDetails] = useState(null)
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
        <>
          <Logo />
          <Header>Let’s start</Header>
          <Paragraph>
            Your amazing app starts here. Open you favorite code editor and
            start editing this project.
          </Paragraph>
          <Paragraph>
            Name: {userDetails.name}, Email: {userDetails.email}
          </Paragraph>
          <Button mode="outlined" onPress={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <Paragraph>Loading...</Paragraph>
      )}
    </Background>
  )
}
