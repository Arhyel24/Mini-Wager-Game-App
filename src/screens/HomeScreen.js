import React, { useEffect, useState } from 'react'
import Background from '../components/Background-sm'
import { auth, db } from '../components/firebase'
import { Text } from 'react-native-paper'
import { ScrollView, StyleSheet } from 'react-native'
import { Button, Card } from 'react-native-paper'
// import challenges from '../assets/challenges'
import Spinner from 'react-native-loading-spinner-overlay'
import AppHeader from '../components/AppHeader'
import { collection, getDocs, doc, setDoc } from 'firebase/firestore'

export default function HomeScreen({ navigation }) {
  const [userDetails, setUserDetails] = useState(null)
  const [challenges, setChallenges] = useState([])

  // async function saveChallengesToFirestore(data) {
  //   data.map((item) => {
  //     setDoc(doc(db, 'Challenges', item.key), item)
  //     console.log(`success ${item.key}`)
  //   })
  // }

  // saveChallengesToFirestore(challenges)

  const fetchChallenges = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Challenges'))
      querySnapshot.forEach((doc) => {
        setChallenges((prevValue) => [...prevValue, doc.data()])
      })
    } catch (error) {
      // console.log('500: NF, please retry')
    }
  }

  useEffect(() => {
    const userData = auth.currentUser
    // console.log(userData)
    if (userData) {
      setUserDetails(userData)
    }

    fetchChallenges()
  }, [])

  return (
    <Background>
      {challenges && userDetails ? (
        <>
          <AppHeader signedInUser={userDetails.email} />

          <ScrollView>
            {challenges.map((item) => (
              <Card
                style={{
                  margin: 20,
                  padding: 20,
                  borderRadius: 10,
                  backgroundColor: '#fff',
                }}
                key={item.key}
              >
                <Card.Title
                  title={item.title}
                  subtitle={item.description}
                  titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
                  subtitleStyle={{ fontSize: 12 }}
                  style={{ padding: 0, margin: 0 }}
                />
                <Card.Cover
                  style={{ borderRadius: 7, marginBottom: 10 }}
                  source={{
                    uri: 'https://fastly.picsum.photos/id/558/700/700.jpg?hmac=9BsnzhVewVpZGiQgZOEmypsxcAA6duN_vFlZWaLN1I4',
                  }}
                />
                <Text style={{ fontSize: 12 }}>
                  Entry fee: {item.entry_fee}
                </Text>
                <Text style={{ fontSize: 12 }}>
                  Bounty: {item.amount_to_win}
                </Text>
                <Card.Actions style={{ paddingHorizontal: 0 }}>
                  {/* <Button>Open</Button> */}
                  <Button
                    style={styles.button}
                    labelStyle={styles.buttontext}
                    mode="outlined"
                    onPress={() => {
                      navigation.navigate('ChallengeScreen', item.key)
                    }}
                  >
                    View Challenge
                  </Button>
                </Card.Actions>
              </Card>
            ))}
          </ScrollView>
        </>
      ) : (
        <Spinner
          visible={true}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      )}
    </Background>
  )
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
    marginTop: 100,
  },
  notice: {
    textAlign: 'right',
    fontStyle: 'italic',
  },
  heading: {
    textAlign: 'center',
    textTransform: 'capitalize',
    fontSize: 18,
  },
  button: {
    width: '100%',
    // marginVertical: 10,
    paddingVertical: 2,
    borderRadius: 7,
    margin: 0,
    padding: 0,
  },
  buttontext: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 26,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 12,
    padding: 20,
  },
})
