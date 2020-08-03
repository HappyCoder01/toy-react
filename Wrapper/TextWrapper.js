export default class TextWrapper {
  constructor(content) {
    this.domNode = document.createTextNode(content);
  }

  mountTo(range) {
    range.deleteContents();
    range.insertNode(this.domNode);
    // parent.appendChild(this.domNode)
  }
}