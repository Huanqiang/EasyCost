import React from 'react'
import { StyleSheet, Animated, View, Image, Text, Easing } from 'react-native'
import noBillIcon from '../../static/no_bill.png'

const NoBill = ({ title, style }) => {
  return (
    <View style={[Styles.container, style]}>
      <Image source={noBillIcon} style={Styles.icon} />
      <Text style={Styles.title}>{title}</Text>
    </View>
  )
}

const withAnimation = Component => {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        show: new Animated.Value(0)
      }
    }

    componentDidMount() {
      Animated.timing(this.state.show, {
        toValue: 1,
        easing: Easing.in,
        duration: 450
      }).start()
    }

    componentWillUnmount() {
      Animated.timing(this.state.show, {
        toValue: 0,
        easing: Easing.in,
        duration: 340
      }).start()
    }

    render() {
      return (
        <Animated.View
          style={{
            opacity: this.state.show,
            transform: [{ scale: this.state.show.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }) }]
          }}
        >
          <Component {...this.props} />
        </Animated.View>
      )
    }
  }
}

export default withAnimation(NoBill)

const Styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 126,
    height: 134
  },
  title: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '700',
    color: '#888888'
  }
})
