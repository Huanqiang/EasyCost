import React from 'react'
import { StyleSheet, Animated, View, Text, TouchableOpacity, Image, Easing } from 'react-native'
import { CategotyIconAddress } from '../../../util/Constants'

const ConnectLine = ({ style }) => {
  return <View style={[Styles.connectLine, style]} />
}

export default ({ icon, comment, money, category, color, date }) => {
  console.log('icon', icon)
  return (
    <View style={[Styles.container, { backgroundColor: color }]}>
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
    </View>
  )
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
