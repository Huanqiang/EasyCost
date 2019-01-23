import React from 'react'
import { StyleSheet, Animated, View, Text, TouchableOpacity, Image, Easing } from 'react-native'
import { ScreenWidth, CategotyIconAddress } from '../../util/Constants'
import Swipeable from 'react-native-swipeable'

const SwipeBtn = ({ title, color, onClick }) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <View
        style={{
          height: 24 + 45,
          width: 76,
          paddingLeft: 8,
          marginVertical: 4
        }}
      >
        <View
          style={{ flex: 1, backgroundColor: color, alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#FFF' }}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const ConnectLine = ({ style }) => {
  return <View style={[Styles.connectLine, style]} />
}

const rightButtons = [
  <SwipeBtn title={'编辑'} color={'#3695FE'} onClick={() => console.log('编辑')} />,
  <SwipeBtn title={'删除'} color={'red'} onClick={() => console.log('编辑')} />
]

export default class Bill extends React.Component {
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
    const { icon, comment, money, category, color, date } = this.props
    console.log(this.state.show)
    return (
      <Swipeable rightButtons={rightButtons}>
        <Animated.View
          style={[Styles.container, { backgroundColor: color, transform: [{ translateX: this.state.show }] }]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={Styles.iconBG}>
              <Image source={{ uri: CategotyIconAddress + icon }} style={{ width: 42, height: 42 }} />
            </View>
            {comment === '' ? (
              <Text style={Styles.category}>{category}</Text>
            ) : (
              <View>
                <Text style={Styles.category}>{category}</Text>
                <Text style={Styles.comment}>{comment}</Text>
              </View>
            )}
          </View>

          <Text style={{ fontSize: 26, color: color === '#FFFFFF' ? 'black' : '#FFF' }}>￥{money}</Text>
          <ConnectLine style={{ top: 0 }} />
          <ConnectLine style={{ bottom: 0 }} />
        </Animated.View>
      </Swipeable>
    )
  }
}

const Styles = StyleSheet.create({
  container: {
    marginVertical: 3,
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconBG: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    width: 46,
    height: 46,
    borderRadius: 23
  },
  category: {
    marginLeft: 8,
    fontSize: 17,
    color: '#FFF'
  },
  comment: {
    marginLeft: 8,
    marginTop: 4,
    fontSize: 14,
    color: '#D9D9D9'
  },
  connectLine: {
    position: 'absolute',
    left: 23 + 15,
    backgroundColor: '#FFF',
    width: 1.5,
    height: 12
  }
})
