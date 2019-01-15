import React from 'react'
import { Animated, View, Text, TouchableOpacity } from 'react-native'
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
      showAnimation: new Animated.Value(0)
    }
  }

  show = () => {
    Animated.spring(this.state.showAnimation, {
      toValue: 1,
      duration: 500
    }).start()
  }

  hidden = () => {
    Animated.spring(this.state.showAnimation, {
      toValue: 0,
      duration: 500
    }).start()
  }

  render() {
    const { showAnimation } = this.state
    return (
      <Animated.View
        style={{
          transform: [
            {
              translateY: showAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [400, -15]
              })
            }
          ]
        }}
      >
        <View
          style={{
            paddingHorizontal: 8,
            alignItems: 'flex-end',
            backgroundColor: '#FFF'
          }}
        >
          <Text style={{ color: '#45CCF6', fontSize: 16, padding: 8 }} onPress={this.hidden}>
            确定
          </Text>
        </View>
        <CustomCalendar {...this.props} />
      </Animated.View>
    )
  }
}
