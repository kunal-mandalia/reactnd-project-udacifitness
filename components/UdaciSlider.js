import React from 'react'
import { StyleSheet, Text, View, Slider } from 'react-native'
import { gray } from '../utils/colors'

export default function UdaciSlider ({ unit, max, step, value, onChange }) {
  return (
    <View style={styles.row}>
      <Slider
        style={{flex: 1}}
        value={value}
        onValueChange={onChange}
        step={step}
        minimumValue={0}
        maximumValue={max}
      />
      <View style={styles.metricCounter}>
        <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
        <Text style={{fontSize: 18, color: gray, textAlign: 'center'}}>{unit}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',    
  },
  metricCounter: {
    width: 85,
    justifyContent: 'center'
  }
})