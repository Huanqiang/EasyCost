import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import LogoIcon from '../../../static/logo.png'

export default ({ style }) => {
  return (
    <View style={[Styles.container, style]}>
      <Image source={LogoIcon} style={Styles.logo} />
      <Text style={Styles.title}>EASY COST</Text>
      <Text style={Styles.slogan}>keep it simple and enjoy</Text>
      <Text style={Styles.beta}>BETA 0.1(01-25)</Text>
    </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  logo: {
    width: 110,
    height: 108
  },
  title: {
    fontSize: 21
  },
  slogan: {
    fontSize: 11,
    color: '#BFBFBF'
  },
  beta: {
    fontSize: 13,
    marginTop: 12
  }
})
