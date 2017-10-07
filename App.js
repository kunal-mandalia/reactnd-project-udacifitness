import React from 'react'
import { View, StyleSheet } from 'react-native'
import History from './components/History'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers/index'
import { composeWithDevTools } from 'remote-redux-devtools';


export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer, composeWithDevTools())}>
        <View style={styles.container}>
          <View style={{height: 20}} />
          <History />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
})
