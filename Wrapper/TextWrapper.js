export default class TextWrapper {
  constructor(content){
    this.root = document.createTextNode(content)
    this.type ='#text'
    this.children = []
    this.props = Object.create(null);
  }
  mountTo(range){
    this.range = range;
    range.deleteContents()
    range.insertNode(this.root)
    // parent.appendChild(this.root)
  }
  get vdom() {
    return this
  }
}