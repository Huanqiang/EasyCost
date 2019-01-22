import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

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

export default ({ weekCost = '0.00', monthCost = '0.00', budget = '0.00' }) => {
  return (
    <View style={{ alignItems: 'center', marginTop: 22 }}>
      <Budget budget={budget} />
      <View style={{ flexDirection: 'row', marginTop: 18 }}>
        <Item title={'本周花费/元'} money={weekCost} />
        <Splitline />
        <Item title={'本月花费/元'} money={monthCost} />
      </View>
    </View>
  )
}
