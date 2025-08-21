/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';

const container = {
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid black',
  height: 25,
};

const headerTitle = {
  fontSize: '11px',
};

class Header extends PureComponent {
  render() {
    return (
      <div style={container}>
        <p style={headerTitle}>{this.props.date}</p>
      </div>
    );
  }
}

export default Header;
