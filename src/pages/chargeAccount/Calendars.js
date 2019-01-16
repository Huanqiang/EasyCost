import React from 'react'
import { Animated, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars'

LocaleConfig.locales['zh'] = {
  monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  dayNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
}
LocaleConfig.defaultLocale = 'zh'

const MAX_DAY = new Date()

const CustomCalendar = ({ day, onClick }) => {
  return (
    <Calendar
      firstDay={1}
      // Initially visible month. Default = Date()
      current={day}
      // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
      // minDate={'2012-05-10'}
      // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
      maxDate={MAX_DAY}
      // Handler which gets executed on day press. Default = undefined
      onDayPress={day => onClick(day.dateString)}
      onDayLongPress={day => onClick(day.dateString)}
      // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
      monthFormat={'yyyy年M月'}
      // Do not show days of other months in month page. Default = false
      hideExtraDays={true}
      // Handler which gets executed when press arrow icon left. It receive a callback can go back month
      onPressArrowLeft={substractMonth => substractMonth()}
      // Handler which gets executed when press arrow icon left. It receive a callback can go next month
      onPressArrowRight={addMonth => addMonth()}
      // Date marking style [simple/period/multi-dot/single]. Default = 'simple'
      markingType={'custom'}
      markedDates={{
        [day]: {
          selected: true,
          customStyles: {
            text: {
              color: 'white'
            }
          }
        }
      }}
    />
  )
}

export default class Calendars extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showAnimation: new Animated.Value(0),
      moveAnimation: new Animated.Value(0)
    }
  }

  show = () => {
    Animated.sequence([
      Animated.timing(this.state.showAnimation, {
        toValue: 1,
        duration: 1
      }),
      Animated.timing(this.state.moveAnimation, {
        toValue: 1,
        duration: 400
      })
    ]).start()
  }

  hidden = () => {
    Animated.sequence([
      Animated.timing(this.state.moveAnimation, {
        toValue: 0,
        duration: 400
      }),
      Animated.timing(this.state.showAnimation, {
        toValue: 0,
        duration: 1
      })
    ]).start()
  }

  render() {
    const { showAnimation, moveAnimation } = this.state
    return (
      <TouchableWithoutFeedback onPress={this.hidden}>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(178,178,178,0.5)',
            justifyContent: 'flex-end',
            transform: [
              {
                translateY: showAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1000, 0]
                })
              }
            ],
            opacity: moveAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1]
            })
          }}
        >
          <Animated.View
            style={{
              height: 390,
              backgroundColor: '#FFF',
              transform: [
                {
                  translateY: moveAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [400, 20]
                  })
                }
              ]
            }}
          >
            <View
              style={{
                paddingHorizontal: 8,
                alignItems: 'flex-start',
                backgroundColor: '#FFF'
              }}
            >
              <Text style={{ color: '#45CCF6', fontSize: 20, padding: 8 }} onPress={this.hidden}>
                确定
              </Text>
            </View>
            <CustomCalendar {...this.props} />
          </Animated.View>
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}
