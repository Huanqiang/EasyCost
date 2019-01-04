import React from 'react'
import { View, Text } from 'react-native'
import NumberKeyboard from './numberKeyboard'

export default () => {
  return (
    <View>
      <Text>Charge Account</Text>
      <NumberKeyboard
        onChangeNumber={num => {
          console.log(num)
        }}
        onDone={num => {
          console.log(num)
        }}
      />
    </View>
  )
}
