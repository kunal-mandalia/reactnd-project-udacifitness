import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { DrawerNavigator } from 'react-navigation'

const Home = ({ navigation }) => (
  <View>
    <Text>Home</Text>
    <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen') }>
      <Text>To the draw!</Text>
    </TouchableOpacity>
  </View>
)

const Dashboard = ({ navigation }) => (
  <View>
    <Text>Dashboard</Text>
    <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen') }>
      <Text>OPEN THE DRAW</Text>
    </TouchableOpacity>
  </View>
)

const Drawer = DrawerNavigator({
  Home: {
    screen: Home
  },
  Dashboard: {
    screen: Dashboard
  }
})

export default Drawer