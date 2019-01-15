const Realm = require('realm')

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
  // Realm.open()
  //   .then(realm => {
  //     realm.write(() => {
  //       realm.create('Bill', bill)
  //       realm.create('CategoryComment', { comment: bill.comment, category: bill.category })
  //     })

  //     console.log(realm.objects('Bill'))
  //     realm.close()
  //   })
  //   .catch(error => {

  //   })

  const realm = new Realm({ schema: [Bill, CategoryComment] })
  try {
    realm.write(() => {
      realm.create('Bill', bill)
      realm.create('CategoryComment', { comment: bill.comment, category: bill.category })
    })

    console.log(realm.objects('Bill'))
  } catch (error) {
    console.log(error)
  } finally {
    realm.close()
  }
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

const fetchAllBillByDay = (day, callback) => {
  Realm.open({ schema: [Bill] })
    .then(realm => {
      const bills = realm.objects('Bill').filtered(`date == ${day}`)
      callback(bills)
      realm.close()
    })
    .catch(error => {
      console.log(error)
      realm.close()
    })
}

const fetchAllBillByTimeQuantum = (start, end, callback) => {
  Realm.open({ schema: [Bill] })
    .then(realm => {
      const bills = realm.objects('Bill').filtered(`date >= $0 && date <= $1`, start, end)
      callback(bills)
      realm.close()
    })
    .catch(error => {
      console.log(error)
      realm.close()
    })
}

export { saveBill, getCategoryComments, fetchAllBillByDay, fetchAllBillByTimeQuantum }
