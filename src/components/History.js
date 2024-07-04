// HistoryScreen.js
import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'

const History = ({ history }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>History</Text>
      </View>

      {/* History List */}
      {history.map((item, index) => (
        <View key={index} style={styles.historyItem}>
          <Text style={styles.historyTitle}>{item.title}</Text>
          <Text style={styles.historyEndDate}>End Date: {item.endDate}</Text>
          <Text style={styles.historyStatus}>Status: {item.status}</Text>
          <Text style={styles.historyDescription}>{item.description}</Text>
        </View>
      ))}
    </ScrollView>
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
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  historyItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  historyEndDate: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  historyStatus: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  historyDescription: {
    fontSize: 16,
    color: '#777',
  },
})

export default History
