const Realm = require('realm')
import { getTimeQuantumStart, getTimeQuantumEnd } from '../util/util'

const Bill = {
  name: 'Bill',
  properties: {
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

const saveBill = bill => {
  Realm.open()
    .then(realm => {
      realm.write(() => {
        realm.create('Bill', bill)
        realm.create('CategoryComment', { comment: bill.comment, category: bill.category })
      })
      realm.close()
    })
    .catch(error => {
      console.log(error)
    })
}

const getCategoryComments = (category, callback) => {
  Realm.open({ schema: [CategoryComment] })
    .then(realm => {
      const categoryComments = realm
        .objects('CategoryComment')
        .filtered('category = $0', category)
        .filtered(`comment != ''`)
        .slice(0, 10)
      callback(
        Array.from(categoryComments).reduce((result = [], item) => {
          if (result.findIndex(c => c == item.comment) == -1) {
            result.push(item.comment)
          }
          return result
        }, [])
      )
      realm.close()
    })
    .catch(error => {
      console.log(error)
    })
}

const fetchAllBillByDay = async (day, callback) => {
  return await fetchAllBillByTimeQuantum(getTimeQuantumStart(day, 'day'), getTimeQuantumEnd(day, 'day'), callback)
}

const fetchAllBillByWeek = (day, callback) => {
  fetchAllBillByTimeQuantum(getTimeQuantumStart(day, 'week'), getTimeQuantumEnd(day, 'week'), callback)
}

const fetchAllBillByMonth = (day, callback) => {
  fetchAllBillByTimeQuantum(getTimeQuantumStart(day, 'month'), getTimeQuantumEnd(day, 'month'), callback)
}

// const fetchAllBillByTimeQuantum = (start, end, callback) => {
//   Realm.open({ schema: [Bill] })
//     .then(realm => {
//       const bills = realm
//         .objects('Bill')
//         .filtered('date >= $0 && date <= $1', start, end)
//         .sorted('date')
//       callback(Array.from(bills).reverse())
//       realm.close()
//     })
//     .catch(error => {
//       console.log(error)
//       realm.close()
//     })
// }

const fetchAllBillByTimeQuantum = async (start, end) => {
  const realm = await Realm.open({ schema: [Bill] }).catch(e => {
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
  getCategoryComments,
  fetchAllBillByDay,
  fetchAllBillByWeek,
  fetchAllBillByMonth,
  fetchAllBillByTimeQuantum
}
