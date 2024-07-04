// Card.js
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const Card = ({ item, buttonText, onPress }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <View style={styles.progressContainer}>{/* <CircularProgress /> */}</View>
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
          <Text style={styles.detailText}>Date Posted: {item.date_posted}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailText}>End Date: {item.end_date}</Text>
        </View>
      </View>
      {buttonText && (
        <TouchableOpacity style={styles.cardButton} onPress={onPress}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
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
})

export default Card
