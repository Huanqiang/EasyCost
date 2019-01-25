import React from 'react'
import { StyleSheet, View, Text, Image, Switch, TouchableOpacity } from 'react-native'

import RightArrowIcon from '../../../static/icon/right_arrow.png'

const Title = ({ title }) => {
  return <Text style={Styles.title}>{title}</Text>
}

const WithNext = ({ title, onClick }) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <View style={Styles.itemContainer}>
        <Title title={title} />
        <Image source={RightArrowIcon} style={{ width: 24, height: 24 }} />
      </View>
    </TouchableOpacity>
  )
}

const WithSwitch = ({ title, value, onChange }) => {
  return (
    <View style={Styles.itemContainer}>
      <Title title={title} />
      <Switch value={value} onValueChange={onChange} />
    </View>
  )
}

export default {
  WithNext,
  WithSwitch
}

const Styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingVertical: 8,
    height: 44,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderColor: '#bfbfbf',
    backgroundColor: 'white'
  },
  title: {
    color: '#595959'
  }
})
