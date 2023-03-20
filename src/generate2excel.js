
import Excel from 'exceljs'

export default function generate2excel (nodeTree, options) {
  const {
    sheetName = 'Sheet1',
    defaultRowHeight = 20,
    defaultColWidth = 15
  } = options
  const wb = new Excel.Workbook()
  const ws = wb.addWorksheet(sheetName, Object.assign({
    properties: {
      defaultRowHeight: defaultRowHeight,
      defaultColWidth: defaultColWidth
    }
  }, {}))
  genetate(nodeTree, ws)
  return wb
}

function genetate (nodeTree) {
  console.log(nodeTree)

  for (const item of nodeTree.children) {
    switch (item.tag) {
      case 0:
        break
      case 1:
        break
      case 2:
      case 3:
        break
      case 4:
        break
      case 5:
        break
      default: break
    }
  }

}