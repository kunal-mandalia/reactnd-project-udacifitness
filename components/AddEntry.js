import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { getMetricMetaInfo, timeToString } from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'
import { Ionicons } from '@expo/vector-icons'
import TextButton from './TextButton'

const SubmitButton = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}>
    <Text>SUBMIT</Text>
  </TouchableOpacity>
)

export default class AddEntry extends Component {
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

    // update redux

    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0
    })
    // navigate to home

    // save to db

    // clear notifications
  }

  reset = () => {
    const key = timeToString()

    // Update Redux

    // Route to Home

    // Update "DB"
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