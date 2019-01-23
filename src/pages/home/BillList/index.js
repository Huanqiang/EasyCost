import React from 'react'
import { StyleSheet, View, Image, ScrollView, FlatList } from 'react-native'
import BillItem from './BillItem'
import withAnimation from './withAnimation'
import withSwipe from './withSwipe'

const Bill = withSwipe(withAnimation(BillItem))

export default ({ dayBills, onDelete }) => {
  console.log('onDelete', onDelete)
  return dayBills.map((bill, index) => <Bill key={bill.id} index={index} {...bill} onDelete={onDelete} />)
}
