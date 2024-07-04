import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

const LeaderboardCard = ({ data }) => {
  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <View style={styles.rankContainer}>
        {index === 0 ? (
          <Text style={styles.crown}>👑</Text>
        ) : (
          <Text style={styles.rankText}>{index + 1}</Text>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.stepsText}>{item.steps} steps</Text>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Leaderboard</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  list: {
    marginTop: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
  },
  crown: {
    fontSize: 24,
  },
  rankText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepsText: {
    fontSize: 14,
    color: '#666',
  },
})

export default LeaderboardCard
