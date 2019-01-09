import React from 'react'
import { View, Text, NativeModules } from 'react-native'
import NumberKeyboard from './NumberKeyboard'
import { getMainColorInImage } from '../../util/util'
import digit from '../../static/icon/type/digit.png'

export default class ChangeAccount extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      money: '0.00'
    }
  }

  getMoney = money => {
    this.setState({ money })
  }

  getColor = (imageUrl, callback) => {
    // './bundle/assets/src/static/icon/digit.png'
    getMainColorInImage(
      './bundle/assets/src/static/bg.png',
      res => {
        console.log('bg.png', res)
      },
      err => {
        console.log(err)
      }
    )
  }

  render() {
    this.getColor()
    return (
      <View style={{ flex: 1 }}>
        <Text>Charge Account: ￥{this.state.money}</Text>
        <Text>{}</Text>
        <NumberKeyboard
          onChangeNumber={this.getMoney}
          onDone={this.getMoney}
          style={{ position: 'absolute', bottom: -60 }}
        />
      </View>
    )
  }
}
