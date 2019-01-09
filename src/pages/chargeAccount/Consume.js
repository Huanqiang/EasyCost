import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'

export default ({ icon, category, money = '0.00', color = '#FFFFFF' }) => {
  return (
    <View style={[Styles.container, { backgroundColor: color }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={Styles.iconBG}>
          <Image source={icon} style={{ width: 36, height: 36 }} />
        </View>
        <Text style={Styles.category}>{category}</Text>
      </View>

      <Text style={{ fontSize: 26, color: color === '#FFFFFF' ? 'black' : '#FFF' }}>￥{money}</Text>
    </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    // height: 44,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconBG: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    width: 39,
    height: 39,
    borderRadius: 19
  },
  category: {
    marginLeft: 8,
    fontSize: 17,
    color: '#FFF'
  }
})
