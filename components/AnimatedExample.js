import React, { Component } from 'react'
import { View, Text, Image, Animated, StyleSheet } from 'react-native'

export default class AnimatedExample extends Component {
  state = {
    opacity: new Animated.Value(0.5),
    width: new Animated.Value(0),
    height: new Animated.Value(0),
    borderRadius: new Animated.Value(0),
  }

  componentDidMount () {
    const { opacity, width, height, borderRadius } = this.state
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000
    }).start()

    Animated.spring(width, {
      toValue: 200,
      speed: 5,
    }).start()

    Animated.spring(height, {
      toValue: 200,
      speed: 5,
    }).start()

    Animated.spring(borderRadius, {
      toValue: 100,
      speed: 2,
    }).start()
  }

  render () {
    const { opacity, width, height, borderRadius } = this.state
    return (
      <View style={styles.container}>
        <Animated.Image
          style={{ opacity, width, height, borderRadius }}
          source={{uri: 'https://s3.eu-west-2.amazonaws.com/grraft-assets/people.jpeg'}}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})