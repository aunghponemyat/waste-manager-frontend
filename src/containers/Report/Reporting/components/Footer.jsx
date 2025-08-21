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
  width: '100%',
  fontSize: '11px',
  textAlign: 'right',
};

class Footer extends PureComponent {
  render() {
    const { totalPages, currentPage } = this.props;
    return (
      <div style={container}>
        <p style={headerTitle}>Page {currentPage} of {totalPages}</p>
      </div>
    );
  }
}

export default Footer;
