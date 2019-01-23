import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Easing } from 'react-native'
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

export default Component => props => {
  console.log(props)
  const rightButtons = [
    <SwipeBtn title={'编辑'} color={'#3695FE'} onClick={() => console.log('编辑')} />,
    <SwipeBtn title={'删除'} color={'red'} onClick={() => props.onDelete(props.id)} />
  ]

  return (
    <Swipeable rightButtons={rightButtons}>
      <Component {...props} />
    </Swipeable>
  )
}
