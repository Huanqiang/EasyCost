import React from 'react'
import { StyleSheet, View, Text, Image, Switch, TouchableOpacity } from 'react-native'
import Item from '../Item'
import { PASSWORD_LOCK_KEY } from '../../../util/Constants'
import { get, set } from '../../../storage'

export default class PasswordLock extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  async componentDidMount() {
    const open = await get(PASSWORD_LOCK_KEY)
    this.setState({ open: open ? Boolean(open) : false })
  }

  onChange = async value => {
    this.setState({ open: value }, () => {
      set(PASSWORD_LOCK_KEY, `${value}`)
    })
  }

  render() {
    const { open } = this.state
    return <Item.WithSwitch title={'设置指纹锁'} value={open} onChange={this.onChange} />
  }
}
