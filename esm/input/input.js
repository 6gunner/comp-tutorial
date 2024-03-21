import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { Component } from "react";
class Input extends Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "handleChange", e => {
      const {
        onChange
      } = this.props;
      if (onChange) {
        onChange(e);
      }
    });
  }
  render() {
    return /*#__PURE__*/React.createElement("input", {
      onChange: this.handleChange
    });
  }
}
export default Input;