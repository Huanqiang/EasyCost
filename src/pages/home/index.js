import React from 'react'
import { StyleSheet, View, Button, Text, Image } from 'react-native'
import Navigation from './Navigation'
import Header from './Header'

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

  navigateToChargeAccount = () => {
    this.props.navigation.navigate('ChargeAccount')
  }
  navigateToAnalysis = () => {
    this.props.navigation.navigate('Analysis')
  }
  navigateToSetting = () => {
    this.props.navigation.navigate('Setting')
  }

  render() {
    return (
      <View style={Styles.container}>
        <Navigation>
          <Image source={analysisIcon} style={{ height: 24, width: 26 }} onPress={this.navigateToAnalysis} />
          <Image source={settingIcon} style={{ height: 26, width: 26 }} onPress={this.navigateToSetting} />
        </Navigation>

        <Header />
        <Button title="go to ChargeAccount View" onPress={this.navigateToChargeAccount} />
      </View>
    )
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
