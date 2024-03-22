import React, { Component } from "react";

type InputProps = {
  onChange: (e) => void;
};
class Input extends Component<InputProps, any> {
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
