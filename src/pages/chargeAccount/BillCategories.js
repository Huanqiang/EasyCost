import React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
const CATEGORY_WIDTH = width / 5

const Category = ({ onClick, category, active }) => {
  return (
    <TouchableOpacity onPress={() => onClick(category)}>
      <View style={Styles.categoryItem}>
        {active ? (
          <Image source={category.selectedIcon} style={{ width: 36, height: 36, marginBottom: 4 }} />
        ) : (
          <Image source={category.unselectedIcon} style={{ width: 36, height: 36, marginBottom: 4 }} />
        )}
        <Text style={{}}>{category.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default class BillCategories extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 1
    }
  }

  changeCategory = category => {
    this.setState({ active: category.id })
    this.props.onChange(category)
  }

  render() {
    const { categories } = this.props
    const newCategories = categories.reduce((result, category, index) => {
      if (index % 5 === 0) {
        return [...result, [category]]
      } else {
        result[result.length - 1].push(category)
        return result
      }
    }, [])

    return (
      <View style={Styles.container}>
        {newCategories.map((rows, index) => (
          <View key={index} style={{ flexDirection: 'row' }}>
            {rows.map(category => (
              <Category
                key={category.id}
                onClick={this.changeCategory}
                category={category}
                active={category.id === this.state.active}
              />
            ))}
          </View>
        ))}
      </View>
    )
  }
}

const Styles = StyleSheet.create({
  container: {
    paddingVertical: 4
  },
  categoryItem: {
    width: CATEGORY_WIDTH,
    paddingVertical: 5,
    alignItems: 'center'
  }
})
