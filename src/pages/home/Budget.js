import React from 'react'
import { View, Text } from 'react-native'
import { get } from '../../storage'
import { BUDGET_KEY } from '../../util/Constants'

const NoBudget = ({ onShowBudgetModel }) => {
  return (
    <Text style={{ color: '#FFFFFF', fontSize: 28, marginBottom: 16 }} onPress={onShowBudgetModel}>
      点击设置预算
    </Text>
  )
}

const Budget = ({ budget }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ color: '#FFFFFF', fontSize: 32 }}>￥{budget}</Text>
      <Text style={{ color: '#E8E8E8', fontSize: 12 }}>{'本月剩余/元'}</Text>
    </View>
  )
}

export default class BudgetContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      budget: 0
    }
  }

  async componentDidMount() {
    this.setState({ budget: Number(await get(BUDGET_KEY)) })
  }

  render() {
    const { budget } = this.state
    const { monthCost, onShowBudgetModel } = this.props
    return budget ? <Budget budget={budget - monthCost} /> : <NoBudget onShowBudgetModel={onShowBudgetModel} />
  }
}
