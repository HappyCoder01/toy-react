import ElementWrapper from "./Wrapper/ElementWrapper.js";
import TextWrapper from "./Wrapper/TextWrapper.js";

export let ToyReact = {
  createElement(type, attributes, ...children) {
    // console.log(arguments)
    let element;
    if (typeof type === 'string')
      element = new ElementWrapper(type);
    else
      element = new type;

    for (let name in attributes) {
      element.setAttribute(name, attributes[name]);
    }

    let insertChildren = (children) => {
      for (let child of children) {
        if (Array.isArray(child)) {
          insertChildren(child)
        } else {
          if (!(child instanceof ElementWrapper)
              && !(child instanceof TextWrapper)
              && !(child instanceof Component)
          )
            child = String(child)
          if (typeof child === "string")
            child = new TextWrapper(child);
          element.appendChild(child);
        }
      }
    }
    insertChildren(children);
    return element;
  },

  render(vDom, element) {
    let range = document.createRange();
    if (element.children && element.children.length) {
      range.setStartAfter(element.lastChild);
      range.setEndAfter(element.lastChild);
    } else {
      range.setStart(element, 0);
      range.setEnd(element, 0);
    }
    vDom.mountTo(range);
  }
}

export class Component {
  constructor() {
    this.children = [];
    this.props = Object.create(null);
  }

  setAttribute(name, value) {
    this[name] = value;
    this.props[name] = value;
  }

  mountTo(range) {
    this.componentWillMount && this.componentWillMount();
    this.range = range;
    this.update(true);
    this.componentDidMount && this.componentDidMount();
  }

  update(firstRender) {
    if (!firstRender)
      this.componentWillUpdate && this.componentWillUpdate();

    let placeholder = document.createComment('placeholder');
    let range = document.createRange();
    range.setStart(this.range.endContainer, this.range.endOffset);
    range.setEnd(this.range.endContainer, this.range.endOffset);
    range.insertNode(placeholder);
    this.range.deleteContents();
    let vDom = this.render();
    vDom.mountTo(this.range);

    if (!firstRender)
      this.componentDidUpdate && this.componentDidUpdate();

    // placeholder.parentNode.removeChild(placeholder);
  }

  appendChild(vChild) {
    this.children.push(vChild);
  }

  setState(state) {
    let mergeState = (oldState, newState) => {
      for (let p in newState) {
        if (typeof newState[p] === 'object') {
          if (typeof oldState[p] !== 'object') {
            oldState[p] = Array.isArray(newState[p]) ? [] : {};
          }
          mergeState(oldState[p], newState[p]);
        } else {
          oldState[p] = newState[p];
        }
      }
    }

    if (!this.state && state)
      this.state = {};

    mergeState(this.state, state);

    this.update(false);
  }
}
