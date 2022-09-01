import React from 'react';
import ReactDOM from 'react-dom';

class CustomPlayerPortal extends React.Component {
  render() {
    const { children, el } = this.props;
    return ReactDOM.createPortal(children, el);
  }
}

export default CustomPlayerPortal;
