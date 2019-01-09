import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Image, Text, TouchableHighlight, Dimensions } from 'react-native'
import Ripple from 'react-native-material-ripple'

import backIcon from '../../static/icon/back.png'
import doneIcon from '../../static/icon/done.png'
import cleanIcon from '../../static/icon/clean.png'

const { width, height } = Dimensions.get('window')
const KEY_WIDTH = width / 4

const keyboardValues = [[7, 8, 9, 'clean'], [4, 5, 6, 'back'], [1, 2, 3, null], ['blank', 0, 'dot', 'done']]

export default class NumberKeyboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number: '',
      hasDecimal: false
    }
  }

  clean = () => {
    this.setState({ number: '' }, () => {
      this.props.onChangeNumber(this.getNumber(this.state.number))
    })
  }

  back = () => {
    this.setState(
      prevState => ({
        number: prevState.number.slice(0, -1),
        hasDecimal: prevState.number.indexOf('.') !== -1
      }),
      () => {
        this.props.onChangeNumber(this.getNumber(this.state.number))
      }
    )
  }

  add = n => {
    this.setState(
      prevState => {
        let newNum = 0
        if (!prevState.hasDecimal) {
          return {
            number: prevState.number + n
          }
        }
        if (prevState.hasDecimal) {
          const afterDot = this.state.number.split('.')[1]
          if (afterDot.length < 2) {
            return {
              number: prevState.number + n
            }
          }
        }
        return {
          number: prevState.number
        }
      },
      () => {
        this.props.onChangeNumber(this.getNumber(this.state.number))
      }
    )
  }

  done = () => {
    this.props.onDone(this.getNumber(this.state.number))
  }

  setDecimal = () => {
    if (!this.state.hasDecimal) {
      this.add('.')
      this.setState({ hasDecimal: true })
    }
  }

  renderKey = (keyJsx, onPress, columnIndex, style = {}, disabled = false) => {
    return (
      <Ripple
        rippleColor={'#888888'}
        key={columnIndex}
        disabled={disabled}
        onPressIn={onPress}
        style={[Styles.keyContainerStyle, style]}
      >
        {keyJsx}
      </Ripple>
    )
  }

  renderKeyJsx = (key, columnIndex) => {
    if (key === null) {
      return null
    }

    if (key === 'clean') {
      return this.renderKey(<Image source={cleanIcon} style={{ width: 30, height: 30 }} />, this.clean, columnIndex)
    } else if (key === 'back') {
      return this.renderKey(<Image source={backIcon} style={{ width: 26, height: 26 }} />, this.back, columnIndex)
    } else if (key === 'done') {
      return this.renderKey(
        <Image source={doneIcon} style={{ width: 30, height: 30 }} />,
        this.done,
        columnIndex,
        Styles.doneKey
      )
    } else if (key === 'dot') {
      return this.renderKey(<Text style={Styles.keyTitle}>.</Text>, this.setDecimal, columnIndex)
      return
    } else if (key === 'blank') {
      return this.renderKey(<View />, null, columnIndex, {}, true)
    } else {
      return this.renderKey(<Text style={Styles.keyTitle}>{key}</Text>, () => this.add(key), columnIndex)
    }
  }

  render() {
    return (
      <View style={[this.props.style]}>
        {keyboardValues.map((row, rowIndex) => {
          return (
            <View style={Styles.keyboardRowStyle} key={rowIndex}>
              {row.map((key, columnIndex) => {
                return this.renderKeyJsx(key, columnIndex)
              })}
            </View>
          )
        })}
      </View>
    )
  }

  getNumber(number) {
    // 当出现小于1块钱（即0.xx元）且尚未输入后面的数字字符，此时只要一个.，应当返回0
    return (number === '' || number === '.' ? 0 : Number(number)).toFixed(2)
  }
}

NumberKeyboard.propTypes = {
  style: PropTypes.object,
  onChangeNumber: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired
}

NumberKeyboard.defaultProps = {
  style: {},
  onChangeNumber: () => {},
  onDone: () => {}
}

const Styles = StyleSheet.create({
  container: { flex: 1 },
  keyboardRowStyle: {
    flexDirection: 'row'
  },
  keyContainerStyle: {
    height: 60,
    width: KEY_WIDTH,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center'
  },
  keyTitle: {
    color: '#575556',
    fontSize: 20
  },
  doneKey: {
    height: 60 * 2,
    position: 'relative',
    top: -60
  }
})
