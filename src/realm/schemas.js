const BillSchema = {
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

const CategorySchema = {
  name: 'Category',
  properties: {
    selectedIcon: 'string',
    unselectedIcon: 'string',
    name: 'string',
    sort: 'int'
  }
}

const CategoryCommentSchema = {
  name: 'CategoryComment',
  properties: {
    comment: 'string',
    category: 'string'
  }
}

export { BillSchema, CategorySchema, CategoryCommentSchema }
