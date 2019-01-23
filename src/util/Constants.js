import { NativeModules, Dimensions } from 'react-native'

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('window')

const CategotyIconAddress = 'bundle/assets/src/static/icon/type/'

const COLOR = {
  title: '#3D3D3D',
  subtitle: '#FFFC133',
  minor: '#434850',
  inverseWhite: '#555B64'
}

const FONTSIZE = {
  large: 24,
  title: 20,
  content: 14,
  tip: 12
}

export { ScreenWidth, ScreenHeight, FONTSIZE, COLOR, CategotyIconAddress }
