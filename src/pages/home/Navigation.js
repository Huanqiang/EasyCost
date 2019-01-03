import React from 'react'
import { StyleSheet, View, Text, Platform, TouchableOpacity } from 'react-native'

export default ({ children }) => {
  return <View style={Styles.container}>{children}</View>
}

const Styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: { marginTop: 24 },
      android: { marginTop: 84 }
    }),
    // height: 44,
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  }
})
