import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { Component } from "react";
class Button extends Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "handleClick", () => {
      const {
        onClick
      } = this.props;
      if (onClick) {
        onClick();
      }
    });
  }
  render() {
    return /*#__PURE__*/React.createElement("button", {
      onClick: this.handleClick
    }, this.props.children);
  }
}
export default Button;