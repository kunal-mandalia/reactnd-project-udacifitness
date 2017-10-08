import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { StackNavigator } from 'react-navigation'

const ScreenA = ({ navigation }) => {
  console.log(navigation)

  return (
    <View>
      <Text>ScreenA</Text>
      <TouchableOpacity onPress={() => { navigation.navigate('ScreenB') }}>
        <Text>Go to ScreenB</Text>
      </TouchableOpacity>
    </View>
  )
}

const ScreenB = ({ navigation }) => (
  <View>
    <Text>ScreenB</Text>
    <TouchableOpacity onPress={() => { navigation.navigate('ScreenA') }}>
      <Text>Back to ScreenA</Text>
    </TouchableOpacity>
  </View>
)

export default StackNavigatorExample = StackNavigator({
  ScreenA: {
    screen: ScreenA,
    navigationOptions: {
      title: 'ScreenA'
    }
  },
  ScreenB: {
    screen: ScreenB,
    navigationOptions: {
      title: 'ScreenB',
      headerTintColor: 'red',
      headerStyle: {
        backgroundColor: 'green'
      }
    }
  }
})
