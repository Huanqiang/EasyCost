import React from 'react'
import { StyleSheet, View, Button, Text, Image, TouchableOpacity } from 'react-native'
import moment from 'moment'
import Navigation from './Navigation'
import Header from './Header'
import BillList from './BillList'

import account from './mock'
import analysisIcon from '../../static/icon/analysis.png'
import settingIcon from '../../static/icon/setting.png'

class LogoTitle extends React.Component {
  render() {
    return <Text>Title</Text>
  }
}

export default class Home extends React.Component {
  // 禁用默认的导航栏
  static navigationOptions = () => ({
    header: null
  })

  constructor(props) {
    super(props)
    this.trigger = false
  }

  navigateToChargeAccount = () => {
    this.props.navigation.navigate('ChargeBill')
  }
  navigateToAnalysis = () => {
    this.props.navigation.navigate('Analysis')
  }
  navigateToSetting = () => {
    this.props.navigation.navigate('Setting')
  }

  renderNavigation = () => {
    return (
      <Navigation>
        <Image source={analysisIcon} style={{ height: 24, width: 26 }} onPress={this.navigateToAnalysis} />
        <Image source={settingIcon} style={{ height: 26, width: 26 }} onPress={this.navigateToSetting} />
      </Navigation>
    )
  }

  render() {
    return (
      <View style={Styles.container}>
        <Header onRenderNavigation={this.renderNavigation} />
        <View style={Styles.content}>
          <TouchableOpacity style={Styles.addButton} onPress={this.navigateToChargeAccount}>
            <Text style={{ color: '#FFFFFF', fontSize: 22 }}>新记一笔</Text>
          </TouchableOpacity>
          <BillList dayBills={account} onAddNewAccount={this.navigateToChargeAccount} />
        </View>
      </View>
    )
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1
  },
  addButton: { backgroundColor: '#92C34A', margin: 8, paddingVertical: 10, borderRadius: 4, alignItems: 'center' }
})
