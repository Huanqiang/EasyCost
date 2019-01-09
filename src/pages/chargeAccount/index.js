import React from 'react'
import { View, Text, NativeModules } from 'react-native'
import NumberKeyboard from './NumberKeyboard'
import NavigationBar from './NavigationBar'
import Consume from './Consume'
import BillCategories from './BillCategories'
import { getMainColorInImage } from '../../util/util'

import self from '../../static/icon/type/self.png'
import categories from './categories'

export default class ChangeAccount extends React.Component {
  // 禁用默认的导航栏
  static navigationOptions = () => ({
    header: null
  })

  constructor(props) {
    super(props)
    this.state = {
      icon: self,
      category: '一般',
      money: '0.00',
      color: '#FF9191'
    }
  }

  changeMoney = money => {
    this.setState({ money })
  }

  changeDate = date => {
    console.log('改变日期')
  }

  changeCategories = category => {
    this.setState({ icon: category.selectedIcon, category: category.name })
    this.getColor(category.iconName)
  }

  back = () => {
    console.log('back')
  }

  render() {
    const { icon, category, money, color } = this.state
    return (
      <View style={{ flex: 1 }}>
        <NavigationBar onClick={this.changeDate} onBack={this.back} date={'1月1日'} />
        <Consume icon={icon} category={category} money={money} color={color} />
        <BillCategories categories={categories} onChange={this.changeCategories} />
        <Text>Charge Account: ￥{this.state.money}</Text>
        <NumberKeyboard
          onChangeNumber={this.changeMoney}
          onDone={this.changeMoney}
          style={{ position: 'absolute', bottom: -60 }}
        />
      </View>
    )
  }

  getColor = imageUrl => {
    getMainColorInImage(
      `bundle/assets/src/static/icon/type/${imageUrl}.png`,
      res => {
        this.setState({ color: res })
      },
      err => {
        console.log(err)
      }
    )
  }
}
