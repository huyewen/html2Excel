
# html2excel

## 安装
> npm install --save @yivn/html2excel


## 使用规范
该包基于exceljs封装，在原先基础上加上parseHtml，使得导出excel的时候不必去频繁手动调用exceljs各类方法属性，直接通过像往常编写页面HTML一样，来对excel表格进行编写。

并通过file-saver自动导出excel文件。

```
import html2excel from '@yivn/html2excel'

const template = `
<table>
  <tr>
    <th>标题1</th>
    <th>标题2</th>
    <th>标题3</th>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>
`

// 只需调用

html2excel(template, {
  filename: 'myexcel.xlsx'
})

```


同时，赋予像通过元素内联样式一样，为excel表格设置样式

```
<td style="border:1;font-size:13;"></td>
```



