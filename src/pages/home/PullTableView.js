import React from 'react'
import PropsTypes from 'prop-types'
import { StyleSheet, ScrollView, Text } from 'react-native'

export default class PullTableView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      indicator: false
    }
  }

  scrolling = event => {
    const distance = event.nativeEvent.contentOffset.y
    if (!this.state.indicator && distance <= -this.props.indicatorHeight) {
      this.setState({ indicator: true })
    } else if (this.state.indicator && distance > -this.props.indicatorHeight) {
      this.setState({ indicator: false })
    }
  }

  scrollEnd = event => {
    if (this.state.indicator) {
      this.props.onPullEnd()
    }
    this.setState({ indicator: false })
  }

  render() {
    const { style, children, onRenderIndicator } = this.props
    return (
      <ScrollView
        style={[{ flex: 1 }, style]}
        contentContainerStyle={{ marginHorizontal: 8 }}
        scrollsToTop
        scrollEventThrottle={64}
        onScroll={this.scrolling}
        onScrollEndDrag={this.scrollEnd}
      >
        {onRenderIndicator(this.state.indicator)}
        {children}
      </ScrollView>
    )
  }
}

PullTableView.propsTypes = {
  indicatorHeight: PropsTypes.number,
  onPullEnd: PropsTypes.func,
  onRenderIndicator: PropsTypes.func,
  style: PropsTypes.object
}

PullTableView.defaultProps = {
  onRenderIndicator: () => <Text>下拉操作</Text>,
  style: {},
  indicatorHeight: 44
}
