import Realm from 'realm'
import { BillSchema, CategorySchema, CategoryCommentSchema } from './schemas'

let realm

const saveBill = bill => {
  try {
    realm.write(() => {
      realm.create('Bill', bill)
      realm.create('CategoryComment', { comment: bill.comment, category: bill.category })
    })
  } catch (error) {
    console.log(error)
  }
}

const getCategoryComments = (category, callback) => {
  try {
    const categoryComments = realm
      .objects('CategoryComment')
      .filtered('category = $0', category)
      .filtered(`comment != ''`)
      .slice(0, 10)

    return Array.from(categoryComments).reduce((result = [], item) => {
      if (result.findIndex(c => c == item.comment) == -1) {
        result.push(item.comment)
      }
      return result
    }, [])
  } catch (error) {
    console.log(error)
    return new Error(error)
  }
}

const openRealm = () => {
  realm = new Realm({ schema: [BillSchema, CategorySchema, CategoryCommentSchema] })
}

const closeRealm = () => {
  if (!realm.isClosed()) {
    realm.close()
  }
}

export { openRealm, closeRealm, saveBill, getCategoryComments }
