import React, { useEffect, useState } from 'react'
import Background from '../components/Background-sm'
import Spinner from 'react-native-loading-spinner-overlay'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../components/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { toast } from 'react-toastify'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'
import { Image } from 'react-native-elements'

export default function ProfileScreen({ navigation }) {
  const [userDetails, setUserDetails] = useState(null)

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      // console.log(user)
      const docRef = doc(db, 'Users', user.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        // console.log(docSnap.data())

        const data = docSnap.data()

        const cuser = {
          name: data.name,
          email: data.email,
          amountEarned: '$5100',
          profileImage: '../../src/assets/boy.png',
          totalChallenges: 20,
        }

        setUserDetails(cuser)
      } else {
        console.log('User is not logged in')
      }
    })
  }

  useEffect(() => {
    fetchUserData()

    // const userData = auth.currentUser
    // console.log(userData)
    // if (userData) {
    //   setUserDetails(userData)
    // }
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
        <ScrollView style={styles.container}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Profile</Text>
          </View>

          {/* Profile Info */}
          <View style={styles.profileContainer}>
            <Image
              source={{ uri: userDetails.profileImage }}
              style={styles.profileImage}
            />
            <Text style={styles.userName}>{userDetails.name}</Text>
            <Text style={styles.userEmail}>{userDetails.email}</Text>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Amount Earned</Text>
              <Text style={styles.statValue}>{userDetails.amountEarned}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Challenges</Text>
              <Text style={styles.statValue}>
                {userDetails.totalChallenges}
              </Text>
            </View>
          </View>

          {/* Links Section */}
          <View style={styles.linksContainer}>
            <TouchableOpacity
              style={styles.linkItem}
              onPress={() => toast('Privacy Policy')}
            >
              <Text style={styles.linkText}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.linkItem}
              onPress={() => toast('Terms & Conditions')}
            >
              <Text style={styles.linkText}>Terms & Conditions</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.linkItem}
              onPress={() => toast('FAQ')}
            >
              <Text style={styles.linkText}>FAQ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.linkItem}
              onPress={() => toast('Conditions')}
            >
              <Text style={styles.linkText}>Conditions</Text>
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
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
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  headerContainer: {
    backgroundColor: '#007BFF',
    padding: 20,
    position: 'fixed',
    top: 0,
    width: '100%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 90,
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  linksContainer: {
    marginHorizontal: 20,
  },
  linkItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 16,
    color: '#007BFF',
  },
  logoutButton: {
    marginHorizontal: 20,
    padding: 15,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
})
