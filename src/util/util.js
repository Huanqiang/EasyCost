import moment from 'moment'
import { NativeModules } from 'react-native'

const today = moment().startOf('day')
const yesterday = moment()
  .subtract(1, 'days')
  .startOf('day')

const getFormatDay = day => {
  return moment(day).format('YYYY-MM-DD')
}

// 获取Date 格式的时间段开始时间: day、month、week、year
const getTimeQuantumStart = (day, quantum) => {
  return moment(day)
    .startOf(quantum)
    .toDate()
}

const getTimeQuantumEnd = (day, quantum) => {
  return moment(day)
    .endOf(quantum)
    .toDate()
}

const transformDay = day => {
  if (moment(day).isSame(today, 'day')) {
    return '今天'
  } else if (moment(day).isSame(yesterday, 'day')) {
    return '昨天'
  } else {
    return moment(day).format('M月D日')
  }
}

// 获取图片的主要颜色
const getMainColorInImage = (imageUrl, success, failure) => {
  NativeModules.RNPixelColor.getHex(imageUrl, { x: 40, y: 8 }, (err, res) => {
    if (err) {
      failure(err)
    } else {
      success(res)
    }
  })
}

export { getFormatDay, getTimeQuantumStart, getTimeQuantumEnd, transformDay, getMainColorInImage }
