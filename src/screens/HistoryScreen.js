import React, { useEffect, useState } from 'react'
import Background from '../components/Background-sm'
import Paragraph from '../components/Paragraph'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../components/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import History from '../components/History'

export default function HistoryScreen({ navigation }) {
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

  const history = [
    {
      title: 'Challenge 1',
      endDate: '2024-07-10',
      status: 'Completed',
      description: 'Description of challenge 1.',
    },
    {
      title: 'Challenge 2',
      endDate: '2024-07-11',
      status: 'Failed',
      description: 'Description of challenge 2.',
    },
    {
      title: 'Challenge 3',
      endDate: '2024-07-12',
      status: 'Ongoing',
      description: 'Description of challenge 3.',
    },
  ]

  return (
    <Background>
      {userDetails ? (
        <History history={history} />
      ) : (
        <Paragraph>Loading...</Paragraph>
      )}
    </Background>
  )
}
