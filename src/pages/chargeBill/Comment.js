import React from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { TextField } from 'react-native-material-textfield'

const PredictCommet = ({ comment, onClick }) => {
  return (
    <TouchableOpacity onPress={() => onClick(comment)}>
      <View style={Styles.predictCommet}>
        <Text style={{ color: '#B8B8B8', fontSize: 13 }}>{comment}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ({ comment, onChangeComment, predictCommets = [], onClick }) => {
  return (
    <View style={Styles.container}>
      <TextField
        label={'账单备注'}
        value={comment}
        onChangeText={text => onChangeComment(text)}
        animationDuration={125}
        returnKeyType={'done'}
      />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {predictCommets.map(pc => (
          <PredictCommet key={pc} comment={pc} onClick={onClick} />
        ))}
      </View>
    </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: -8
  },
  predictCommet: {
    borderWidth: 1,
    borderColor: '#B8B8B8',
    borderRadius: 20,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginHorizontal: 2,
    marginBottom: 4
  }
})
