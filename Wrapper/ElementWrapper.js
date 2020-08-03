export default class ElementWrapper {
  constructor(type) {
    this.domNode = document.createElement(type);
  }

  setAttribute(name, value) {
    if (name.match(/^on([\s\S]+)$/)) {
      let eventName = RegExp.$1.replace(/^[\s\S]/, s => s.toLowerCase());
      this.domNode.addEventListener(eventName, value);
    }
    if (name === "className")
      name = "class";
    this.domNode.setAttribute(name, value);
  }

  appendChild(vChild) {
    let range = document.createRange();
    if (this.domNode.children && this.domNode.children.length) {
      range.setStartAfter(this.domNode.lastChild);
      range.setEndAfter(this.domNode.lastChild);
    } else {
      range.setStart(this.domNode, 0);
      range.setEnd(this.domNode, 0);
    }
    vChild.mountTo(range);
  }

  mountTo(range) {
    range.deleteContents();
    range.insertNode(this.domNode);
    // range.appendChild(this.domNode)
  }
}