import React, { Component } from 'react';

type ButtonProps = {
  onClick?: (e) => void;
} & React.PropsWithChildren;
class Button extends Component<ButtonProps, any> {
  constructor(props) {
    super(props);
  }

  handleClick = (e) => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(e);
    }
  };

  render() {
    return <button onClick={this.handleClick}>{this.props.children}</button>;
  }
}

export default Button;
