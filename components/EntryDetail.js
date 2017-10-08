import React, {Component} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/colors'
import MetricCard from './MetricCard'

class EntryDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params
    
    const year = entryId.slice(0, 4)
    const month = entryId.slice(5, 7)
    const day = entryId.slice(8)
    return {
      title: `${day}/${month}/${year}`
    }
  }

  render () {
    const { metrics, navigation } = this.props
    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics} />
        <Text>Entry Details {navigation.state.params.entryId}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 1
  }
})

const mapStateToProps = (state, { navigation }) => {
  const { entryId } = navigation.state.params

  return {
    entryId,
    metrics: state[entryId]
  }
}

export default connect(mapStateToProps)(EntryDetail)