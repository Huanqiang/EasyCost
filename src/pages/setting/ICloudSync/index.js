import React from 'react'
import { StyleSheet, View, Text, Image, Switch, TouchableOpacity } from 'react-native'
import Item from '../Item'
import { ICLOUD_SYNC_KEY } from '../../../util/Constants'
import { get, set } from '../../../storage'

export default class ICloudSync extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  async componentDidMount() {
    const open = await get(ICLOUD_SYNC_KEY)
    this.setState({ open: open ? Boolean(open) : false })
  }

  onChange = async value => {
    this.setState({ open: value }, () => {
      set(ICLOUD_SYNC_KEY, `${value}`)
    })
  }

  render() {
    const { open } = this.state
    return <Item.WithSwitch title={'iCloud 同步'} value={open} onChange={this.onChange} />
  }
}
