import React from 'react'
import { StyleSheet, View, Animated, Text, TouchableOpacity, PanResponder } from 'react-native'
import { transformDay, getFormatDay, getPrevDay } from '../../util/Date'
import { ScreenWidth } from '../../util/Constants'

const DAY_WIDTH = (ScreenWidth - 64) / 7

const getDays = (num = 7, firstDay) => {
  return [...Array(num)].reduce(res => [...res, getPrevDay(res[res.length - 1])], [firstDay])
}

const DayItem = ({ day }) => {
  return (
    <View style={Styles.dayContainer}>
      <Text style={Styles.day}>{transformDay(day, { format: 'D号' })}</Text>
    </View>
  )
}

export default class DayList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      days: getDays(8, getFormatDay(new Date(), 'YYYY-MM-DD')),
      moveAnima: new Animated.Value(0),
      move: 0,
      lastMove: 0
    }
    this.moveDistance = 0

    this.panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
        // gestureState.{x,y} 现在会被设置为0
      },
      onPanResponderMove: (evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}
        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
        // Animated.event()
        this.setState(prevState => ({
          move: prevState.lastMove + gestureState.dx
        }))
        this.state.moveAnima.setValue(this.state.lastMove + gestureState.dx)
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
        if (gestureState.dx > 0) {
          this.swipeRight(this.state.move)
        } else if (gestureState.dx < 0) {
          this.swipeLeft(this.state.move)
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        return true
      }
    })
  }

  swipeRight = distance => {
    console.log('right')
    // 判断是否移动至了最前面
    if (distance >= 0) {
      Animated.spring(this.state.moveAnima, {
        toValue: 0,
        duration: 200
      }).start(() => {
        this.setState({ move: 0, lastMove: 0 }) // 将移动距离重置
      })
      // 触发回调函数
      this.props.onChange(this.state.days[0])
    } else {
      this.moveEnd(distance)
    }
  }

  swipeLeft = distance => {
    console.log('left')
    // 日期移动后的剩余宽度
    const residue = this.state.days.length * (DAY_WIDTH + 8) + distance
    // 判断是否需要新增数据
    if (residue <= ScreenWidth) {
      const needAddItemNum = Math.floor((ScreenWidth - residue) / (DAY_WIDTH + 8)) + 1
      this.setState(prevState => {
        const needAddDays = getDays(needAddItemNum, getPrevDay(prevState.days[prevState.days.length - 1]))
        return {
          days: [...prevState.days, ...needAddDays]
        }
      })
    }

    this.moveEnd(distance)
  }

  // 手指滑动结束后，判断日期归位
  moveEnd = distance => {
    // 完全移动的日期的个数
    const moveItem = Math.floor(distance / (DAY_WIDTH + 8))
    // 判断最后一个是否过了一半
    if (Math.abs(distance % (DAY_WIDTH + 8)) < (DAY_WIDTH + 8) / 2) {
      this.moveLastElement((moveItem + 1) * (DAY_WIDTH + 8))
    } else {
      this.moveLastElement(moveItem * (DAY_WIDTH + 8))
    }
  }

  moveLastElement = toValue => {
    // 触发回调函数
    this.props.onChange(this.state.days[Math.abs(toValue / (DAY_WIDTH + 8))])

    Animated.spring(this.state.moveAnima, {
      toValue: toValue,
      duration: 200
    }).start(() => {
      this.setState({ lastMove: toValue })
    })
  }

  render() {
    const { days, moveAnima, move } = this.state
    return (
      <View style={Styles.container}>
        <Animated.View
          style={{ flexDirection: 'row', transform: [{ translateX: moveAnima }] }}
          {...this.panResponder.panHandlers}
        >
          {days.map(day => (
            <DayItem key={day} day={day} />
          ))}
        </Animated.View>
      </View>
    )
  }
}

const Styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    marginBottom: 4
  },
  dayContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    width: DAY_WIDTH,
    height: DAY_WIDTH,
    borderRadius: DAY_WIDTH / 2,
    borderWidth: 1,
    borderColor: '#8C8C8C'
  },
  day: {
    fontSize: 14
  }
})
