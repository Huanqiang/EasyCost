import { AsyncStorage } from 'react-native'

export const set = async (key, value) => {
  try {
    console.log('(key, value)', key, value)
    await AsyncStorage.setItem(key, value)
  } catch (error) {
    console.log(error)
  }
}

export const get = async key => {
  try {
    console.log('await AsyncStorage.getItem(key)', await AsyncStorage.getItem(key))
    return (await AsyncStorage.getItem(key)) || undefined
  } catch (error) {
    console.log(error)
  }
}

export const remove = async key => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (error) {
    console.log(error)
  }
}
