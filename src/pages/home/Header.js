import React from 'react'
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native'
// import { AnimatedCircularProgress } from 'react-native-circular-progress'

const { width, height } = Dimensions.get('window')
const HEADER_HEIGHT = 200

import HeaderBG from '../../static/header-bg.png'

const Item = ({ title, money }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ color: '#E8E8E8', fontSize: 11 }}>{title}</Text>
      <Text style={{ color: '#FFFFFF', fontSize: 24 }}>￥{money}</Text>
    </View>
  )
}

const Splitline = () => {
  return (
    <View
      style={{
        height: 44,
        width: 1,
        marginHorizontal: 44,
        backgroundColor: '#F3F3F3'
      }}
    />
  )
}

const Budget = ({ budget }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ color: '#FFFFFF', fontSize: 32 }}>￥{budget}</Text>
      <Text style={{ color: '#E8E8E8', fontSize: 12 }}>{'本月剩余/元'}</Text>
    </View>
  )
}

export default ({ onRenderNavigation, weekCost, monthCost, budget }) => {
  return (
    <View style={Styles.container}>
      <Image style={{ flex: 1, resizeMode: 'cover', width: width, height: HEADER_HEIGHT }} source={HeaderBG} />
      <View style={{ position: 'absolute', width: width, height: HEADER_HEIGHT }}>
        {onRenderNavigation()}
        <View style={{ alignItems: 'center', marginTop: 22 }}>
          <Budget budget={budget} />
          <View style={{ flexDirection: 'row', marginTop: 18 }}>
            <Item title={'本周花费/元'} money={weekCost} />
            <Splitline />
            <Item title={'本月花费/元'} money={monthCost} />
          </View>
        </View>
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
