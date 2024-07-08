import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import Background from '../components/Background-sm'
import { auth, db } from '../components/firebase'
import { collection, doc, setDoc, getDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from '../components/Header'
import BackButton from '../components/BackButton'
import Spinner from 'react-native-loading-spinner-overlay'
import { theme } from '../core/theme'
import { Pedometer } from 'expo-sensors'
import LeaderboardCard from '../components/LeaderboardCard'
// import CircularProgress from 'react-native-circular-progress-indicator'
import CircularProgressBar from '../components/CIrcularProgressBar'

const ChallengeScreen = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true)
  const [stepcount, updateStepcount] = useState(0)
  const [item, setItem] = useState(0)
  const [userDetails, setUserDetails] = useState(null)
  const [pedometeravailabilty, setpedometeravailability] = useState(null)
  const [finished, setFinished] = useState(false)
  const [pedometerStarted, setPedometerStarted] = useState(false)
  const [remainingTime, setRemainingTime] = useState(0)

  const challengesRef = collection(db, 'Challenges')

  var dist = stepcount / 13000
  var distanceCovered = dist.toFixed(4)

  const key = route.params

  // const vetUser = async () => {
  //   const nameQuery = query(
  //     challengesRef,
  //     where('userId', '==', userDetails.uid)
  //   )
  //   const snapshot = await nameQuery.get()
  //   const userData = snapshot.docs.map((doc) => doc.data())
  //   console.log(userData)
  //   if (userData.length > 0) {
  //     // if documents were found
  //     setFinished(true) // set finished to true in state
  //   } else {
  //     setFinished(false)
  //   }
  // }

  const fetchChallenge = async () => {
    const docRef = doc(db, 'Challenges', key)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      setItem(docSnap.data())
    } else {
      toast('No internet, please try again!!')
    }

    await Pedometer.requestPermissionsAsync()

    setLoading(false)
  }

  useEffect(() => {
    fetchChallenge()
    const userData = auth.currentUser
    // console.log(userData)
    if (userData) {
      setUserDetails(userData)
    }
  }, [])

  // useEffect(() => {
  //   let timer
  //   if (pedometerStarted) {
  //     Pedometer.watchStepCount(async (result) => {
  //       updateStepcount(result.steps)
  //     })
  //     timer = setInterval(() => {
  //       setRemainingTime((prevTime) => prevTime - 1000)
  //     }, 1000)
  //   } else {
  //     clearInterval(timer)
  //     // Pedometer.clearWatch()
  //     saveSteps
  //   }
  //   return () => clearInterval(timer)
  // }, [pedometerStarted])

  const startPedometer = async () => {
    if (pedometeravailabilty) {
      toast('Pedometer is available')

      setPedometerStarted(true)
      setRemainingTime(300000)
    } else {
      toast('Pedometer is not available')
    }
  }

  const stopPedometer = async () => {
    // Pedometer.clearWatch()
    setPedometerStarted(false)
    saveSteps()
  }

  Pedometer.isAvailableAsync().then(
    (result) => {
      setpedometeravailability(result)
    },
    (error) => {
      toast('Please restart the app')
      // setpedometeravailability(error)
    }
  )

  const saveSteps = async () => {
    await setDoc(doc(challengesRef, key), {
      userId: userDetails.uid,
      stepcount,
    })
  }

  const cdata = [
    { name: 'Alice', steps: 15000 },
    { name: 'Bob', steps: 13000 },
    { name: 'Charlie', steps: 12000 },
  ]

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <Header>Challenge Details</Header>
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <View style={styles.progressContainer}>
          {/* <CircularProgress
            value={stepcount}
            maxValue={item.steps}
            radius={150}
            textColor={'#ddd'}
            activeStrokeColor={'#f39c12'}
            inActiveStrokeColor={'#9859B6'}
            inActiveStrokeOpacity={0.5}
            inActiveStrokeWidth={30}
            activeStrokeWidth={30}
            title="Steps Count"
            titleColor={'#ECF0F1'}
            titleStyle={{ fontWeight: 'bold' }}
          /> */}
          <CircularProgressBar
            selectedValue={stepcount}
            maxValue={item.steps}
            radius={100}
            activeStrokeColor="#0f4fff"
            withGradient
          />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailText}>
              Distance Covered: {item.distanceCovered || 0}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailText}>Entry Fee: {item.entry_fee}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailText}>
              1st Place Prize: {item.amount_to_win}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailText}>Status: {item.status}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailText}>Steps Needed: {item.steps}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailText}>
              Time to Complete: {item.time_to_complete}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailText}>
              Date Posted: {item.date_posted}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailText}>End Date: {item.end_date}</Text>
          </View>
        </View>
        {finished ? (
          <TouchableOpacity
            style={styles.cardButton}
            onPress={startPedometer}
            disabled={true}
          >
            <Text style={styles.buttonText}>Challenge Completed</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.cardButton}
            onPress={startPedometer}
            disabled={pedometerStarted ? true : false}
          >
            <Text style={styles.buttonText}>
              {!pedometerStarted
                ? 'Start Challenge'
                : `${remainingTime / 1000} mins Remaining`}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View>
        <LeaderboardCard data={cdata} />
      </View>
    </Background>
  )
}

export default ChallengeScreen

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
    marginTop: 100,
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailItem: {
    width: '48%', // Adjust this width as needed to fit two columns
    marginBottom: 10,
  },
  cardContainer: {
    backgroundColor: '#FDFDFD', // Milk-like color
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    padding: 20,
    margin: 10,
    borderColor: '#ECECEC', // Light border color for better visibility
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  progressContainer: {
    alignItems: 'center',
    marginVertical: 10,
    height: 100, // Adjust height to fit your CircularProgress component
  },
  detailsContainer: {
    marginTop: 10,
  },
  detailItem: {
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#777',
  },
  cardButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
