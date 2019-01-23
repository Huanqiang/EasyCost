import React from 'react'
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native'
import { ScreenWidth } from '../../util/Constants'
import upIcon from '../../static/icon/arrow_up.png'
import downIcon from '../../static/icon/arrow_down.png'

export default ({ style, indicator }) => {
  return (
    <View style={[Styles.container, style]}>
      {indicator ? (
        <>
          <Image source={upIcon} style={{ width: 24, height: 24 }} />
          <Text>准备新增</Text>
        </>
      ) : (
        <>
          <Image source={downIcon} style={{ width: 24, height: 24 }} />
          <Text>新记一笔</Text>
        </>
      )}
    </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    width: ScreenWidth - 16,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
