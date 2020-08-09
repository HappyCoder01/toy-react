
let childrenSymbol = Symbol("children")
export default class ElementWrapper {
  constructor(type){
    this.type = type;
    this.props = Object.create(null);
    this[childrenSymbol] = [];
    this.children = []
  }
  setAttribute(name, value){
    // //event-handling
    // if(name.match(/^on([\s\S]+)$/)){
    //     let eventName = RegExp.$1.replace(/^[\s\S]/, s=>s.toLowerCase())
    //     // console.log(eventName)
    //     this.root.addEventListener(eventName, value)
    // }
    // if(name === 'className'){
    //     name = 'class'
    // }
    // this.root.setAttribute(name, value)
    this.props[name] = value
  }
  appendChild(vchild){
    this[childrenSymbol].push(vchild)
    this.children.push(vchild.vdom)
    // let range = document.createRange();
    // if(this.root.children.length){
    //     range.setStartAfter(this.root.lastChild)
    //     range.setEndAfter(this.root.lastChild)
    // } else {
    //     range.setStart(this.root, 0)
    //     range.setEnd(this.root, 0)
    // }
    // vchild.mountTo(range)
  }
  get vdom() {
    return this
  }
  mountTo(range){
    this.range = range;

    let ph = document.createComment('placeholder')
    let endRange = document.createRange()
    endRange.setStart(range.endContainer, range.endOffset)
    endRange.setEnd(range.endContainer, range.endOffset)
    endRange.insertNode(ph)

    range.deleteContents()
    let element = document.createElement(this.type)
    for(let name in this.props){
      let value = this.props[name]
      //event-handling
      if(name.match(/^on([\s\S]+)$/)){
        let eventName = RegExp.$1.replace(/^[\s\S]/, s=>s.toLowerCase())
        // console.log(eventName)
        element.addEventListener(eventName, value)
      }
      if(name === 'className'){
        name = 'class'
      }
      element.setAttribute(name, value)
    }

    //render
    for(let child of this.children){
      let range = document.createRange();
      if(element.children.length){
        range.setStartAfter(element.lastChild)
        range.setEndAfter(element.lastChild)
      } else {
        range.setStart(element, 0)
        range.setEnd(element, 0)
      }
      // console.log(child)
      child.mountTo(range)
    }
    range.insertNode(element)
  }
}