import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { getMetricMetaInfo, timeToString, getDailyReminderValue } from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'
import { Ionicons } from '@expo/vector-icons'
import TextButton from './TextButton'
import { submitEntry, removeEntry } from '../utils/api'
import { connect } from 'react-redux'
import { addEntry } from '../actions/index'

const SubmitButton = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}>
    <Text>SUBMIT</Text>
  </TouchableOpacity>
)

export class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  }

  increment = metric => {
    const { max, step } = getMetricMetaInfo(metric)

    this.setState(state => {
      const count = state[metric] + step
      return {
        ...state,
        [metric]: count > max ? max : count
      }
    })
  }

  decrement = metric => {
    const { step } = getMetricMetaInfo(metric)

    this.setState(state => {
      const count = state[metric] - step
      return {
        ...state,
        [metric]: count < 0 ? 0 : count
      }
    })
  }

  slide = (metric, value) => {
    this.setState({
      [metric]: value
    })
  }

  submit = () => {
    const key = timeToString()
    const entry = this.state

    this.props.addEntry({
      [key]: entry
    })

    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0
    })

    // navigate to home

    submitEntry({ key, entry })

    // clear notifications
  }

  reset = () => {
    const key = timeToString()

    // Update Redux
    this.props.addEntry({
      [key]: getDailyReminderValue()
    })

    // Route to Home

    removeEntry(key)
  }

  render() {
    const metaInfo = getMetricMetaInfo()

    if (this.props.alreadyLogged) {
      return (
        <View>
          <Ionicons
            name={`ios-happy-outline`}
            size={100}
          />
          <Text>You already logged your information for today.</Text>
          <TextButton onPress={this.reset}>
            Reset
          </TextButton>
        </View>
      )
    }

    return (
      <View>
        <Text>{JSON.stringify(this.state)}</Text>
        <DateHeader date={(new Date().toLocaleDateString())} />
        {Object.keys(metaInfo).map(key => {
          const metricInfo = metaInfo[key]
          const { getIcon, type, unit, ...rest } = metricInfo
          const value = this.state[key]
          {/* alert(JSON.stringify(metaInfo[key]))           */}
          return (
            <View key={key}>
              {getIcon()}

              {type === 'slider'
                ? <UdaciSlider
                    {...metricInfo}
                    value={value}
                    onChange={(value) => this.slide(key, value)}
                  />
                : <UdaciSteppers
                    {...metricInfo}
                    value={value}
                    onIncrement={() => { this.increment(key) }}
                    onDecrement={() => { this.decrement(key) }}
                  />
              }

            </View>
          )
        })}
        <SubmitButton onPress={this.submit} />        
      </View>
    )
  }
}

const mapStateToProps = state => {
  const key = timeToString()

  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined'
  }
}
const mapDispatchToProps = dispatch => ({
  addEntry: (entry) => dispatch(addEntry(entry))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddEntry)