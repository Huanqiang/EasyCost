import { createStackNavigator, createAppContainer } from 'react-navigation'
import AnalysisScreen from '../analysis'
import ChargeBillScreen from '../chargeBill'
import HomeScreen from '../home'
import SettingScreen from '../setting'
import ChangeBudgetScreen from '../ChangeBudget'
import SortCategoryScreen from '../SortCategory'

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Analysis: AnalysisScreen,
    ChargeBill: ChargeBillScreen,
    Setting: SettingScreen,
    SortCategory: SortCategoryScreen,
    ChangeBudget: SortCategoryScreen
  },
  {
    initialRouteName: 'Home'
  }
)
export default createAppContainer(AppNavigator)
