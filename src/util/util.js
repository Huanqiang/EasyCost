import moment from 'moment'
import { NativeModules } from 'react-native'

const today = moment().startOf('day')
const yesterday = moment()
  .subtract(1, 'days')
  .startOf('day')

const transformDay = day => {
  if (moment(day).isSame(today, 'day')) {
    return '今天'
  } else if (moment(day).isSame(yesterday, 'day')) {
    return '昨天'
  } else {
    return day
  }
}

// 获取图片的主要颜色
const getMainColorInImage = (imageUrl, success, failure) => {
  NativeModules.RNPixelColor.getHex('./bundle/assets/src/static/icon/digit.png', { x: 40, y: 8 }, (err, res) => {
    if (err) {
      failure(err)
    } else {
      success(res)
    }
  })
}

export { transformDay, getMainColorInImage }
