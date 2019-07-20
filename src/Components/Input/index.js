import React from "react";
import Chips from "../Chips";
import "./styles.css";

const MemoizedChips = React.memo(Chips);

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: props.data,
      selected: [],
      searchTerm: "",
      highlight: false,
      count: 0
    };
  }

  componentDidMount() {
    this.nameInput.focus();
  }

  handleChange = e => {
    const { data } = this.props;
    const value = e.target.value.toLowerCase();
    let filtered = [];
    if (value) {
      filtered = data.filter(item => item.name.toLowerCase().includes(value));
    }
    this.setState({ filtered, searchTerm: value, highlight: false, count: 0 });
  };

  handleSelect = id => {
    let { filtered, selected } = this.state;
    let selectedNew = [];
    selectedNew = filtered.filter(item => item.id === id);
    filtered = filtered.filter(item => item.id !== id);
    selected = selected.concat(selectedNew);
    this.setState({ selected, filtered, searchTerm: "" });
    this.nameInput.focus();
  };

  removeItem = id => {
    let { selected } = this.state;
    const { data } = this.props;
    selected = selected.filter(item => item.id !== id);
    this.setState({ selected, filtered: data });
    this.nameInput.focus();
  };

  onKeyDown = e => {
    let { count, selected } = this.state;
    const { data } = this.props;
    count = count + 1;
    if (count > 1) {
      selected.pop();
      this.setState({ selected, filtered: data });
    } else {
      if (e.keyCode === 8) {
        this.setState({ highlight: true, count, filtered: data });
      }
    }
  };

  render() {
    const { filtered, selected, searchTerm, highlight } = this.state;
    const style = {
      background: "red"
    };
    let value;
    if (selected.length > 0) {
      value = selected.slice(-1).pop();
      value = value.id;
    }
    return (
      <div>
        <div className="header">
          {selected.map(item => (
            <MemoizedChips
              data={item}
              removeItem={this.removeItem}
              style={highlight && value === item.id ? style : ""}
            />
          ))}
          <input
            ref={input => {
              this.nameInput = input;
            }}
            className="input-field"
            onChange={this.handleChange}
            value={searchTerm}
            onKeyDown={this.onKeyDown}
          />
        </div>
        <div className="dropdown">
          {filtered.map(item => (
            <div
              className="dropdown-item"
              onClick={() => this.handleSelect(item.id)}
            >
              <img src={item.image} className="profile-images" />
              {item.name}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
