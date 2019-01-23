import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import noBillIcon from '../../static/no_bill.png'

export default ({ title, style }) => {
  return (
    <View style={[Styles.container, style]}>
      <Image source={noBillIcon} style={Styles.icon} />
      <Text style={Styles.title}>{title}</Text>
    </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 126,
    height: 134
  },
  title: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '700',
    color: '#888888'
  }
})
