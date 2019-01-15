import React from 'react'
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import { transformDay } from '../../util/util'

import calendar from '../../static/icon/calendar.png'
import close from '../../static/icon/close.png'

const Date = ({ date, onClick }) => {
  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={[Styles.flexRow, Styles.date]}>
        <Image source={calendar} style={{ width: 24, height: 24, marginRight: 8 }} />

        <Text style={{ fontSize: 20, color: '#FFF' }}>{transformDay(date)}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default class NavigationBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { onClick, onBack } = this.props
    return (
      <View style={[Styles.container, Styles.flexRow]}>
        <View style={Styles.closeBtn}>
          <TouchableWithoutFeedback onPress={onBack}>
            <Image source={close} style={{ width: 26, height: 26 }} />
          </TouchableWithoutFeedback>
        </View>

        <Date onClick={onClick} date={this.props.date} />
      </View>
    )
  }
}

const Styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    height: 64,
    backgroundColor: 'red', //#45CCF6
    justifyContent: 'center',
    alignItems: 'center'
  },
  flexRow: {
    flexDirection: 'row'
  },
  date: {
    justifyContent: 'center'
  },
  closeBtn: {
    position: 'absolute',
    top: 29,
    left: 16
  }
})
