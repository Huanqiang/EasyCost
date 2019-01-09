import { createStackNavigator, createAppContainer } from 'react-navigation'
import AnalysisScreen from '../analysis'
import ChargeAccountScreen from '../chargeAccount'
import HomeScreen from '../home'
import SettingScreen from '../setting'

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Analysis: AnalysisScreen,
    ChargeAccount: ChargeAccountScreen,
    Setting: SettingScreen
  },
  {
    initialRouteName: 'ChargeAccount'
  }
)
export default createAppContainer(AppNavigator)
