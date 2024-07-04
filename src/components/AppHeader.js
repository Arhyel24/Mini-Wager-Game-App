// AppHeader.js
import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

const AppHeader = ({ signedInUser }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Mini Wagering Game App</Text>
      <Text style={styles.signedInNote}>Signed in as: {signedInUser}</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        placeholderTextColor="#bbb"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#007BFF', // Shade of blue
    padding: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  signedInNote: {
    fontSize: 14,
    color: '#d0e1ff',
    marginBottom: 15,
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
})

export default AppHeader
