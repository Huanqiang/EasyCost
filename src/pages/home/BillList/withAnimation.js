import React from 'react'
import { Animated, Easing } from 'react-native'
import { ScreenWidth } from '../../../util/Constants'

export default Component => {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        show: new Animated.Value(ScreenWidth)
      }
    }

    componentDidMount() {
      Animated.timing(this.state.show, {
        toValue: 0,
        easing: Easing.in,
        duration: 340,
        delay: 180 * this.props.index
      }).start()
    }

    render() {
      return (
        <Animated.View style={{ transform: [{ translateX: this.state.show }] }}>
          <Component {...this.props} />
        </Animated.View>
      )
    }
  }
}
