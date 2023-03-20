const tagWhiteList = [
  'table',
  'tr',
  'th',
  'td',
  'img'
]

const tagMap = tagWhiteList.reduce((cur, next, currentIndex) => {
  cur[next] = currentIndex + 1
  return cur
}, {})

const unaryTag = ['img']

const isUnaryTag = (tag) => unaryTag.includes(tag)

export {
  isUnaryTag,
  tagWhiteList,
  tagMap
}