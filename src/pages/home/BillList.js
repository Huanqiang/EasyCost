import React from 'react'
import { StyleSheet, View, Image, FlatList } from 'react-native'
import Bill from './Bill'

export default ({ dayBills }) => {
  return dayBills.map(dayBill => <Bill key={dayBill.id} day={dayBill.day} bills={dayBill.bills} />)
}
