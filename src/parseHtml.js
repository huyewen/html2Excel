
import { tagWhiteList, isUnaryTag, tagMap } from './utils.js'

class Node {
  constructor(tag, attr, type = 1, text = '', children = []) {
    this.tag = tag
    this.attr = attr
    this.type = type
    this.text = text
    this.children = children
  }
}

export default class Parse {
  stack = []
  root = null
  html = ''

  constructor(template) {
    this.html = template
  }

  preHandler () {
    this.html = this.html
      .replace(/\n[ ]*/g, '')
      .replace(/<\s*/g, '<')
      .replace(/\s*>/g, '>')
      .replace(/\s*\/>/g, '/>')
      .replace(/<\/\s*/g, '</')
      .replace(/\s*=\s*"/g, '="')
  }

  generateAST () {
    this.preHandler()
    this.parseHtml()

    return this.root
  }

  parseHtml () {
    while (this.html.trim()) {
      const startIndex = this.html.indexOf('<')

      if (startIndex === 0) {
        if (this.html.indexOf('</') === 0) {
          this.parseEnd()
        } else {
          this.parseStart()
        }
      } else if (startIndex > 0) {
        if (this.stack.length > 0) {
          this.parseText(this.html.slice(0, startIndex))
        }
        this.html = this.html.slice(startIndex)
      }
    }

    if (this.stack.length) {
      console.log(this.stack)
      throw new Error('The template you provide does not conform to specification ')
    }
  }

  parseStart () {
    const idx = this.html.indexOf('/>')
    const endIndex = idx > -1 ? idx : this.html.indexOf('>')
    const content = this.html.slice(1, endIndex)
    const firstSpaceIdx = content.indexOf(' ')

    let tag = ''
    let attrStr = ''

    if (firstSpaceIdx === -1) {
      tag = content
      attrStr = ''
    } else {
      tag = content.slice(0, firstSpaceIdx)
      attrStr = content.slice(firstSpaceIdx + 1)
    }

    if (!tagWhiteList.includes(tag)) {
      throw new Error(`the "${tag}" tag is not exist in the tagWhiteList`)
    }

    const attrMap = this.parseAttrs(attrStr ? attrStr.split(/"\s+/g) : [])

    const eleAst = new Node(tag, attrMap, tagMap[tag], '', [])

    if (!this.root) {
      this.root = eleAst
    }

    this.stack.push(eleAst)

    if (isUnaryTag(tag)) {
      console.log(tag)
      this.processEle()
    }

    this.html = this.html.slice(idx > -1 ? idx + 2 : endIndex + 1)
  }

  parseEnd () {
    this.html = this.html.slice(this.html.indexOf('>') + 1)
    this.processEle()
  }

  parseText (text) {
    if (!text.trim()) {
      return
    }

    const textAst = new Node('', null, 0, text, null)
    this.stack[this.stack.length - 1].children.push(textAst)
  }

  parseAttrs (attrs) {
    const map = {}
    for (const str of attrs) {
      const [name, value] = str.split('=')
      map[name.trim()] = value.trim().replace(/["']/g, '')
    }

    return map
  }

  processEle () {
    const curEle = this.stack.pop()
    const stackLen = this.stack.length
    if (stackLen) {
      this.stack[stackLen - 1].children.push(curEle)
      curEle.parent = this.stack[stackLen - 1]
    }
  }
}
