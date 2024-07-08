import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
// import GoogleButton from 'react-google-button'

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>Mini Wager App</Header>
      <Paragraph>
        The easiest way to compete in amazing challenges with your friends and
        family.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
      {/* <GoogleButton
        onClick={() => {
          console.log('Google button clicked')
        }}
      /> */}
    </Background>
  )
}
