// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA1nx-jEBYfCdXnLlCe-IfpuCbo30zE2gk',
  authDomain: 'mini-wager-game-app.firebaseapp.com',
  projectId: 'mini-wager-game-app',
  storageBucket: 'mini-wager-game-app.appspot.com',
  messagingSenderId: '129494433141',
  appId: '1:129494433141:web:edb3b65db8dc9ee175273c',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth()
export default app
