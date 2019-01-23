import { NativeModules, Dimensions } from 'react-native'

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get('window')

const CategotyIconAddress = 'bundle/assets/src/static/icon/type/'

export { ScreenWidth, ScreenHeight, CategotyIconAddress }
