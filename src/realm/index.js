const Realm = require('realm')
import { getTimeQuantumStart, getTimeQuantumEnd } from '../util/Date'

const Bill = {
  name: 'Bill',
  primaryKey: 'id',
  properties: {
    id: 'string', // primary key
    money: 'string',
    date: { type: 'date', default: new Date() },
    color: 'string',
    comment: { type: 'string', default: '' },
    category: 'string',
    icon: 'string'
  }
}

const Category = {
  name: 'Category',
  properties: {
    selectedIcon: 'string',
    unselectedIcon: 'string',
    name: 'string',
    sort: 'int'
  }
}

const CategoryComment = {
  name: 'CategoryComment',
  properties: {
    comment: 'string',
    category: 'string'
  }
}

/**
 * 记录新的消费账目
 * @param {*} bill 消费账目
 */
const saveBill = async bill => {
  const realm = await Realm.open({ schema: [Bill, CategoryComment] })

  realm.write(() => {
    realm.create('Bill', { ...bill, id: `${+new Date()}` })
    realm.create('CategoryComment', { comment: bill.comment, category: bill.category })
  })
}

/**
 * 更新消费账目
 * @param {*} bill 需要被更新的消费账目
 */
const updateBill = async bill => {
  const realm = await Realm.open({ schema: [Bill, CategoryComment] })

  realm.write(() => {
    realm.create('Bill', { ...bill }, true)
    realm.create('CategoryComment', { comment: bill.comment, category: bill.category })
  })
}

/**
 * 删除消费账目
 * @param {*} id 需要被删除的账目id
 */
const deleteBill = async id => {
  const realm = await Realm.open({ schema: [Bill, CategoryComment] })

  realm.write(() => {
    realm.delete(realm.objectForPrimaryKey('Bill', id))
  })
}

/**
 * 获取某一消费类别中的前十条不重复的账目备注
 * @param {*} category 消费类别
 */
const getCategoryComments = async category => {
  const realm = await Realm.open({ schema: [Bill, CategoryComment] })
  const categoryComments = realm
    .objects('CategoryComment')
    .filtered('category = $0', category)
    .filtered(`comment != ''`)
    .slice(0, 10)
  const result = Array.from(categoryComments).reduce((res = [], item) => {
    if (res.findIndex(c => c == item.comment) == -1) {
      res.push(item.comment)
    }
    return res
  }, [])
  return JSON.parse(JSON.stringify(result))
}

/**
 * 获取某一天的所有消费信息
 * @param {*} day 该天中的任意时间
 */
const fetchAllBillByDay = async day => {
  return await fetchAllBillByTimeQuantum(getTimeQuantumStart(day, 'day'), getTimeQuantumEnd(day, 'day'))
}

/**
 * 获取某一星期的所有消费信息
 * @param {*} day 该星期中的任意时间
 */
const fetchAllBillByWeek = async day => {
  return await fetchAllBillByTimeQuantum(getTimeQuantumStart(day, 'week'), getTimeQuantumEnd(day, 'week'))
}

/**
 * 获取某一月的所有消费信息
 * @param {*} day 该月中的任意时间
 */
const fetchAllBillByMonth = async day => {
  return await fetchAllBillByTimeQuantum(getTimeQuantumStart(day, 'month'), getTimeQuantumEnd(day, 'month'))
}

/**
 * 获取某一时间段的所有消费信息
 * @param {*} start 该时间段的开始时间
 * @param {*} end 该时间段的结束时间
 */
const fetchAllBillByTimeQuantum = async (start, end) => {
  const realm = await Realm.open({ schema: [Bill, CategoryComment] }).catch(e => {
    console.log(e)
  })
  const bills = realm
    .objects('Bill')
    .filtered('date >= $0 && date <= $1', start, end)
    .sorted('date')
  return JSON.parse(JSON.stringify(Array.from(bills))).reverse()
}

export {
  saveBill,
  updateBill,
  deleteBill,
  getCategoryComments,
  fetchAllBillByDay,
  fetchAllBillByWeek,
  fetchAllBillByMonth,
  fetchAllBillByTimeQuantum
}
