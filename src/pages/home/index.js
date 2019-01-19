import React from 'react'
import { StyleSheet, View, Button, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import moment from 'moment'
import Navigation from './Navigation'
import Header from './Header'
import BillList from './BillList'
import DayList from './DayList'
import Indicator from './Indicator'
import { fetchAllBillByDay } from '../../realm'
import { transformDay, getFormatDay } from '../../util/util'
import analysisIcon from '../../static/icon/analysis.png'
import settingIcon from '../../static/icon/setting.png'
import noBillIcon from '../../static/no_bill.png'

export default class Home extends React.Component {
  // 禁用默认的导航栏
  static navigationOptions = () => ({
    header: null
  })

  constructor(props) {
    super(props)
    this.state = {
      day: new Date(),
      bills: [],
      indicator: false
    }
  }

  async componentDidMount() {
    this.setState({ bills: await fetchAllBillByDay(this.state.day) })
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

  changeCurDate = async day => {
    this.setState({ day: moment(day).toDate() })
    this.setState({ bills: await fetchAllBillByDay(moment(day).toDate()) })
  }

  scrolling = event => {
    const distance = Math.abs(event.nativeEvent.contentOffset.y)
    if (!this.state.indicator && distance >= 44) {
      this.setState({ indicator: true })
    } else if (this.state.indicator && distance <= 44) {
      this.setState({ indicator: false })
    }
  }

  scrollEnd = event => {
    if (this.state.indicator) {
      this.navigateToChargeAccount()
    }
    this.setState({ indicator: false })
  }

  renderNavigation = () => {
    return (
      <Navigation>
        <Image source={analysisIcon} style={{ height: 24, width: 26 }} onPress={this.navigateToAnalysis} />
        <View
          style={{ borderColor: '#FFF', borderWidth: 1, borderRadius: 30, paddingHorizontal: 12, paddingVertical: 3 }}
        >
          <Text style={{ fontSize: 16, color: '#FFF' }}>{transformDay(this.state.day)}</Text>
        </View>
        <Image source={settingIcon} style={{ height: 26, width: 26 }} onPress={this.navigateToSetting} />
      </Navigation>
    )
  }

  render() {
    const { day, bills, indicator } = this.state
    return (
      <View style={Styles.container}>
        <Header onRenderNavigation={this.renderNavigation} />
        <View style={Styles.content}>
          <TouchableOpacity style={Styles.addButton} onPress={this.navigateToChargeAccount}>
            <Text style={{ color: '#FFFFFF', fontSize: 22 }}>新记一笔</Text>
          </TouchableOpacity>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ marginHorizontal: 8 }}
            scrollsToTop
            scrollEventThrottle={64}
            onScroll={this.scrolling}
            onScrollEndDrag={this.scrollEnd}
          >
            <Indicator style={{ position: 'absolute', top: -48 }} indicator={indicator} />
            <DayList onChange={this.changeCurDate} />
            {bills.length !== 0 ? (
              <BillList dayBills={bills} />
            ) : (
              <View style={{ marginTop: 36, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={noBillIcon} style={{ width: 126, height: 134 }} />
                <Text style={{ marginTop: 8, fontSize: 18, fontWeight: '700', color: '#888888' }}>
                  今天还没有记账消费哟！！！
                </Text>
              </View>
            )}
          </ScrollView>
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
    // marginHorizontal: 8
  },
  addButton: {
    backgroundColor: '#92C34A',
    margin: 8,
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center'
  }
})
