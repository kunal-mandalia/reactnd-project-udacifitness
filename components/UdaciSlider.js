import React from 'react'
import { StyleSheet, Text, View, Slider } from 'react-native'

export default function UdaciSlider ({ unit, max, step, value, onChange }) {
  return (
    <View>
      <Slider
        value={value}
        onValueChange={onChange}
        step={step}
        minimumValue={0}
        maximumValue={max}
      />
      <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    </View>
  )
}
