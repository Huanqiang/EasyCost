import React from 'react'
import { StyleSheet, View, Image, Text, TouchableHighlight } from 'react-native'
import { transformDay } from '../../../util/util'
import Swipeout from 'react-native-swipeout'

var swipeoutBtns = [
  {
    type: 'delete',
    text: '删除'
  },
  {
    type: 'primary',
    text: '编辑'
  }
]

const DayBar = ({ day, total }) => {
  return (
    <View style={Styles.billTitle}>
      <Text style={Styles.billTitleFont}>{transformDay(day)}</Text>
      <Text style={Styles.billTitleFont}>共计: ￥{total}</Text>
    </View>
  )
}

const BillItem = ({ icon, remark, money }) => {
  return (
    <Swipeout right={swipeoutBtns} backgroundColor={'transparent'} sensitivity={30} buttonWidth={64} autoClose>
      <View />
      <View style={Styles.billBody}>
        <View style={Styles.billIconContainer}>
          <Image source={icon} style={Styles.billIcon} />
        </View>
        <View />
        <View
          style={{
            flex: 1,
            paddingHorizontal: 16,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Text>{remark}</Text>
          <Text>{money}</Text>
        </View>
      </View>
    </Swipeout>
  )
}

export default ({ day, bills }) => {
  const total = bills.reduce((t, bill) => t + bill.money, 0)
  return (
    <View>
      <DayBar day={day} total={total} />
      {bills.map(bill => (
        <BillItem key={bill.id} {...bill} />
      ))}
    </View>
  )
}

const Styles = StyleSheet.create({
  billTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 6,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F3F3'
    // backgroundColor: '#D9D9D9'
  },
  billTitleFont: {
    color: '#858585',
    fontSize: 13
  },
  billBody: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    paddingVertical: 8,
    // backgroundColor: 'red',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F3F3'
  },
  billIconContainer: {
    width: 33,
    height: 33,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    backgroundColor: '#EBEAEA'
    // marginRight: 16
  },
  billIcon: {
    width: 21,
    height: 21
  }
})
