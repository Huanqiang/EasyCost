import moment from 'moment'

/**
 * 返回今日的最早时间
 */
const getToday = () => {
  return moment().startOf('day')
}

/**
 * 返回昨天的最早时间
 */
const getYesterday = () => {
  return moment()
    .subtract(1, 'days')
    .startOf('day')
}

/**
 * 获取前一天的日期
 * @param {*} day 当前时间，默认今天
 * @param {*} format 时间的格式，默认 'YYYY-MM-DD'
 */
const getPrevDay = (day, format = 'YYYY-MM-DD') => {
  return moment(day)
    .subtract(1, 'days')
    .format(format)
}

/**
 * 获取当前时间的 Date 格式
 * @param {*} day 任意字符串的时间
 */
const toDate = day => {
  return moment(day).toDate()
}

/**
 * 格式化某一时间
 * @param {*} day 想要格式的时间，默认今天
 * @param {*} format 时间的格式，默认 'YYYY-MM-DD'
 */
const getFormatDay = (day = moment(), format = 'YYYY-MM-DD') => {
  return moment(day).format(format)
}

/**
 * 获取 Date 格式的时间段开始时间
 * @param {*} day 想要获取的时间段内的某一时间
 * @param {*} quantum 时间格式：day、month、week、year
 */
const getTimeQuantumStart = (day, quantum) => {
  return moment(day)
    .startOf(quantum)
    .toDate()
}

/**
 * 获取 Date 格式的时间段结束时间
 * @param {*} day 想要获取的时间段内的某一时间
 * @param {*} quantum 时间格式：day、month、week、year
 */
const getTimeQuantumEnd = (day, quantum) => {
  return moment(day)
    .endOf(quantum)
    .toDate()
}

/**
 * 按照条件获取格式化时间，比如返回今天、昨天或者是诸如12月3日(默认)这样格式的数据
 * @param {*} day 格式化后的时间
 */
const transformDay = (day, { format: format } = { format: 'M月D日' }) => {
  if (moment(day).isSame(getToday(), 'day')) {
    return '今天'
  } else if (moment(day).isSame(getYesterday(), 'day')) {
    return '昨天'
  } else {
    return getFormatDay(day, format)
  }
}

export {
  getToday,
  getYesterday,
  getPrevDay,
  toDate,
  getFormatDay,
  getTimeQuantumStart,
  getTimeQuantumEnd,
  transformDay
}
