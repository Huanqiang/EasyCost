import { createStackNavigator, createAppContainer } from 'react-navigation'
import AnalysisScreen from '../analysis'
import ChargeBillScreen from '../chargeBill'
import HomeScreen from '../home'
import SettingScreen from '../setting'

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Analysis: AnalysisScreen,
    ChargeBill: ChargeBillScreen,
    Setting: SettingScreen
  },
  {
    initialRouteName: 'Home'
  }
)
export default createAppContainer(AppNavigator)
