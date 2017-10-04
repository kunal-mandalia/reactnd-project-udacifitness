import React from 'react'
import { View } from 'react-native'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers/index'
import { composeWithDevTools } from 'remote-redux-devtools';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer, composeWithDevTools())}>
        <View>
          <AddEntry />
        </View>
      </Provider>
    )
  }
}