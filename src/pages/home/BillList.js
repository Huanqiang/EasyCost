import React from 'react'
import { StyleSheet, View, Image, ScrollView, FlatList } from 'react-native'
import Bill from './Bill'

export default ({ dayBills }) => {
  return dayBills.map((bill, index) => <Bill key={index} {...bill} />)
}
