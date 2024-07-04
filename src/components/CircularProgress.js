import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import Animated, { EasingNode } from 'react-native-reanimated'

const { Value, timing } = Animated

const CircularProgress = ({ progress }) => {
  const progressAnimation = new Value(0)

  useEffect(() => {
    timing(progressAnimation, {
      toValue: progress,
      duration: 1000,
      EasingNode: EasingNode.linear,
    }).start()
  }, [progress])

  const rotate = progressAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.progressCircle,
          {
            transform: [{ rotate }],
          },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: 'blue',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    position: 'absolute',
    top: 5,
    left: 5,
  },
})

export default CircularProgress
