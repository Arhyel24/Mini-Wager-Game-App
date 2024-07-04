import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Background from '../components/Background-sm'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from '../components/Header'
import BackButton from '../components/BackButton'
import Spinner from 'react-native-loading-spinner-overlay'
import { theme } from '../core/theme'
import { Pedometer } from 'expo-sensors'
import CircularProgress from '../components/CircularProgress'
import LeaderboardCard from '../components/LeaderboardCard'
import ChallengeCard from '../components/ChallengeCard'

const ChallengeScreen = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false)
  const [stepcount, updateStepcount] = useState(0)
  const [pedometeravailabilty, setpedometeravailability] = useState('')

  var dist = stepcount / 13000
  var distanceCovered = dist.toFixed(4)

  var cal = distanceCovered * 60
  var caloriesBurnt = cal.toFixed(4)

  const item = route.params

  //   console.log(props)
  //   console.log(navigation)

  const subscribe = () => {
    const subscription = Pedometer.watchStepCount((result) => {
      updateStepcount(result.steps)
    })
  }

  Pedometer.isAvailableAsync().then(
    (result) => {
      setpedometeravailability(String(result))
    },
    (error) => {
      setpedometeravailability(error)
    }
  )

  const data = [
    { name: 'Alice', steps: 15000 },
    { name: 'Bob', steps: 13000 },
    { name: 'Charlie', steps: 12000 },
  ]

  //   if (pedometeravailabilty) {
  //     useEffect(() => {
  //       subscribe()
  //     }, [])
  //   } else {
  //     toast('Pedometer is not available')
  //   }

  //   const CircularProgress = () => {
  //     // Replace this with your actual circular progress bar component implementation
  //     return (
  //       <CircularProgressBar
  //         value={stepcount}
  //         maxValue={250}
  //         radius={150}
  //         textColor={'#ddd'}
  //         activeStrokeColor={'#f39c12'}
  //         inActiveStrokeColor={'#9859B6'}
  //         inActiveStrokeOpacity={0.5}
  //         inActiveStrokeWidth={30}
  //         activeStrokeWidth={30}
  //         title="Step Count"
  //         titleColor={'#ECF0F1'}
  //         titleStyle={{ fontWeight: 'bold' }}
  //       />
  //     )
  //   }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <Header>CHallenge Details</Header>
      <ChallengeCard
        item={item}
        buttonText="Start Challenge"
        onPress={() => alert(`${item.title} Started!`)}
      />

      <View>
        <LeaderboardCard data={data} />
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
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
