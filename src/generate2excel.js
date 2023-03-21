
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

function genetate (nodeTree, ws, curRow = 0) {
  const children = nodeTree.children
  for (let i = 0; i < children.length; i++) {
    const item = children[i]
    switch (item.type) {
      case 0: // text
        break
      case 1: // table
        break
      case 2: // tr
        curRow = i
        addRow(ws)
        break
      case 3: // th
      case 4: // td
        break
      case 5: // img
        break
      default: break
    }

    if (item.children && item.children.length) genetate(item, ws, curRow)
  }

}

function addRow (ws) {
  ws.addRow({}) // 添加一个空行
}