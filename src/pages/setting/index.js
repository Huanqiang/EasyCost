import React from 'react'
import { StyleSheet, View, Text, Image, Switch, TouchableOpacity } from 'react-native'
import { ScreenWidth } from '../../util/Constants'

import ChangeBudget from './ChangeBudget'
import ICloudSync from './ICloudSync'
import PasswordLock from './PasswordLock'
import SortCategory from './SortCategory'
import About from './About'

export default class Setting extends React.Component {
  static navigationOptions = {
    title: '设置',
    headerBackTitle: '返回',
    headerTruncatedBackTitle: '返回'
  }

  constructor(props) {
    super(props)
  }

  navigateToChangeBudget = () => {
    this.props.navigation.navigate('ChangeBudget')
  }
  navigateToSortCategory = () => {
    this.props.navigation.navigate('SortCategory')
  }

  render() {
    return (
      <View style={Styles.container}>
        <ChangeBudget onClick={this.navigateToChangeBudget} />
        <ICloudSync />
        <PasswordLock />
        <SortCategory onClick={this.navigateToSortCategory} />
        <About style={{ position: 'absolute', bottom: 20, left: ScreenWidth / 2 - 55 }} />
      </View>
    )
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    backgroundColor: '#F5F5F5'
  }
})
