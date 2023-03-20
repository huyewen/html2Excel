import Parse from './parseHtml'
import generate2excel from './generate2excel'
import { saveAs } from 'file-saver'

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'

export default function html2excel (template, options = {}) {
  const { filename = `${Date.now()}.xlsx` } = options
  const parse = new Parse(template)
  // 将模板转换为ast
  const nodeTree = parse.generateAST()
  // 生成excel
  const workbook = generate2excel(nodeTree, options)
  // 导出excel
  workbook.xlsx.writeBuffer().then(data => {
    const blob = new Blob([data], { type: EXCEL_TYPE })
    saveAs(blob, filename)
  })
}