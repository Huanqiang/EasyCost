import React from 'react'
import { StyleSheet, View, Image, FlatList } from 'react-native'
import Bill from '../Bill'

export default class BillList extends React.Component {
  keyExtractor = (item, index) => item.id

  renderItem = ({ item }) => <Bill key={item.id} day={item.day} bills={item.bills} />

  navigation = () => {
    this.props.onAddNewAccount()
  }

  render() {
    const { dayBills } = this.props
    return (
      <FlatList
        data={dayBills}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        onRefresh={this.navigation}
        refreshing={true}
      />
    )
  }
}
