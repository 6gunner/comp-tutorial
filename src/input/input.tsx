import React, { Component } from "react";

class Input extends Component<any, any> {
  props: any;

  constructor(props) {
    super(props);
  }

  handleChange = (e) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(e);
    }
  };

  render() {
    return <input onChange={this.handleChange} />;
  }
}

export default Input;
