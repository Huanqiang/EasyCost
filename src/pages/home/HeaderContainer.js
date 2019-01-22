import React from 'react'
import { StyleSheet, View, Image, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
const HEADER_HEIGHT = 200

import HeaderBG from '../../static/header-bg.png'

export default ({ onRenderNavigation, children }) => {
  return (
    <View style={Styles.container}>
      <Image style={{ flex: 1, resizeMode: 'cover', width: width, height: HEADER_HEIGHT }} source={HeaderBG} />
      <View style={{ position: 'absolute', width: width, height: HEADER_HEIGHT }}>
        {onRenderNavigation()}
        {children}
      </View>
    </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    // backgroundColor: '#1A94F6',
    flexDirection: 'row'
  }
})
