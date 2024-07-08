import React, { useEffect, useState } from 'react'
import Background from '../components/Background-sm'
import Paragraph from '../components/Paragraph'
import { auth, db } from '../components/firebase'
import History from '../components/History'

export default function HistoryScreen({ navigation }) {
  const [userDetails, setUserDetails] = useState(null)

  useEffect(() => {
    const userData = auth.currentUser
    if (userData) {
      setUserDetails(userData)
    }
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
