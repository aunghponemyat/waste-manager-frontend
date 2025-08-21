/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import '../../../../scss/report/CoverPage.scss';

const logo = `${process.env.PUBLIC_URL}/logo.png`;

class CoverPage extends PureComponent {
  render() {
    let coverImage = 'https://images.unsplash.com/photo-1499123785106-343e69e68db1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1953&q=80';
    const {
      organization,
      reportTitle,
      date,
      background,
    } = this.props;
    if (background) {
      coverImage = background;
    }
    return (
      <div style={{ backgroundImage: `url(${coverImage})` }} className="page">

        <div className="box">
          <h1>Waste Management Report</h1>
          <h4><i>{reportTitle}</i></h4>
          <h4><i>{organization}</i></h4>
          <div className="thin-box">
            <p>Reliance Restricted</p>
            <p>{date}</p>
          </div>
        </div>
        <img className="logo" src={logo} alt="" width="100" height="100" />
      </div>
    );
  }
}

export default CoverPage;
