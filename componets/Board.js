import {ToyReact, Component} from "../ToyReact.js";
import Square from "./Square.js";

export default class Board extends Component {
  renderSquare(i) {
    return <Square value={i}/>;
  }

  componentWillMount() {
    console.log('BoardWillMount')
  }

  componentDidMount() {
    console.log('BoardDidMount')
  }

  componentWillUpdate() {
    console.log('BoardWillUpdate')
  }

  componentDidUpdate() {
    console.log('BoardDidUpdate')
  }

  render() {
    return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
    );
  }
}