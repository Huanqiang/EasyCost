import React from 'react'
import { StyleSheet, View, Text, Image, Switch, TouchableOpacity } from 'react-native'
import Item from '../Item'

export default ({ onClick }) => {
  return <Item.WithNext title={'类别整理'} onClick={onClick} />
}
