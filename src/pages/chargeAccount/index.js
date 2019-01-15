import React from 'react'
import { View, Text, NativeModules, Keyboard } from 'react-native'
import NumberKeyboard from './NumberKeyboard'
import NavigationBar from './NavigationBar'
import Consume from './Consume'
import BillCategories from './BillCategories'
import Comment from './Comment'
import { getMainColorInImage } from '../../util/util'
import { saveBill, getCategoryComments } from '../../realm'
import { CategotyIconAddress } from '../../util/constant'
import Calendars from './Calendars'

import categories from './categories'

export default class ChangeAccount extends React.Component {
  // 禁用默认的导航栏
  static navigationOptions = () => ({
    header: null
  })

  constructor(props) {
    super(props)
    this.state = {
      icon: 'self.png',
      category: '一般',
      money: '0.00',
      color: '#FF9191',
      comment: '',
      date: '2019-01-15',
      predictCommets: []
    }
    this.calendarRef = React.createRef()
  }

  componentDidMount() {
    this.getCurCategoryComments(this.state.category)
  }

  saveNewBill = () => {
    const { icon, category, money, color, comment, date, predictCommets } = this.state
    saveBill({ icon, category, money, color, comment, date: new Date(date) })
  }

  showCalendar = () => {
    console.log('showCalendar')
    this.calendarRef.current.show()
  }

  changeDate = date => {
    console.log(date)
    this.setState({ date })
  }

  changeCategories = category => {
    this.setState({ icon: category.selectedIcon, category: category.name })
    this.getColor(category.selectedIcon)
    this.getCurCategoryComments(category.name)
  }

  changeComment = comment => {
    this.setState({ comment })
  }

  changeMoney = money => {
    this.setState({ money })
  }

  selectPredictComment = comment => {
    this.setState({ comment })
  }

  getCurCategoryComments = category => {
    getCategoryComments(category, comments => {
      this.setState({ predictCommets: comments })
      comments.forEach(comment => {
        console.log(comment)
      })
    })
  }

  back = () => {
    console.log('back')
  }

  render() {
    const { icon, category, money, color, comment, date, predictCommets } = this.state
    return (
      <View style={{ flex: 1 }}>
        <NavigationBar onClick={this.showCalendar} onBack={this.back} date={date} />
        <Consume icon={icon} category={category} money={money} color={color} onClick={this.hiddenKeyBoard} />
        <BillCategories categories={categories} onChange={this.changeCategories} />
        <Comment
          comment={comment}
          onChangeComment={this.changeComment}
          predictCommets={predictCommets}
          onClick={this.selectPredictComment}
        />
        {/* <NumberKeyboard
          onChangeNumber={this.changeMoney}
          onDone={this.saveNewBill}
          style={{ position: 'absolute', bottom: -60 }}
        /> */}
        <Calendars ref={this.calendarRef} day={date} onClick={this.changeDate} />
      </View>
    )
  }

  hiddenKeyBoard = () => {
    Keyboard.dismiss()
  }

  getColor = image => {
    getMainColorInImage(
      CategotyIconAddress + image,
      res => {
        this.setState({ color: res })
      },
      err => {
        console.log(err)
      }
    )
  }
}
