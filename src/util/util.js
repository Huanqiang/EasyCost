import { NativeModules } from 'react-native'

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

export { getMainColorInImage }
