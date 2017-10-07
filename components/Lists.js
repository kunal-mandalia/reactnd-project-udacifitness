import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  SectionList } from 'react-native'

const reviews = Array.from(('hello world').split('').map((l, i) => ({value: l, key: i })))

class Review extends Component {
  renderItem ({ item, index, separators }) {
    return (
      <Text key={item.key} style={styles.review}>{item.value}</Text>    
    )
  }

  render () {
    return (
      <FlatList
        data={reviews}
        renderItem={this.renderItem}
      />
    )
  }
}

const styles = StyleSheet.create({
  reviews: {
    flex: 1,
    backgroundColor: 'blue',
  },
  review: {
    padding: 40,
    backgroundColor: 'blue',
    color: 'white'
  }
})

Review.defaultProps = {
  reviews: reviews
}

export default Review