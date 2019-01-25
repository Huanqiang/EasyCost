import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Dialog from 'react-native-dialog'
import { set } from '../../storage'
import { BUDGET_KEY } from '../../util/Constants'

export default class DialogTester extends Component {
  state = {
    text: ''
  }

  handleCancel = () => {
    this.props.onCancel()
  }

  handleDone = async () => {
    await set(BUDGET_KEY, this.state.text)
    this.props.onCancel()
  }

  changeText = text => {
    this.setState({ text })
  }

  render() {
    return (
      <Dialog.Container visible={this.props.visible}>
        <Dialog.Title>请输入当月预算</Dialog.Title>
        {/* <Dialog.Description>
            请输入您的本月消费越算
          </Dialog.Description> */}
        <Dialog.Input
          placeholder={'0.00'}
          value={this.state.text}
          onChangeText={this.changeText}
          keyboardType={'numeric'}
        />
        <Dialog.Button label="取消" onPress={this.handleCancel} />
        <Dialog.Button label="确定" onPress={this.handleDone} />
      </Dialog.Container>
    )
  }
}
