/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../../../../scss/report/Intro.scss';

const logo = `${process.env.PUBLIC_URL}/logo.png`;

// const sortDates = (a, b) => a.getTime() - b.getTime();
const months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
// const formatDate = date => `${date.getDate()} ${months[date.getMonth() + 1]} ${date.getFullYear()}`;
const formatDate = date => `${months[date.getMonth()]} ${date.getFullYear()}`;

class Intro extends PureComponent {
  render() {
    const {
      organization,
      date,
      address1,
      address2,
      address3,
      totalPages,
      dates,
      contractDate,
    } = this.props;
    return (
      <div className="intro-page">
        <Header date={date} />
        <div className="intro-content">
          <div className="div-1">
            <img className="intro-logo" src={logo} alt="" width="100px" height="100px" />
            <p id="info">
              <b>RecyGlo Co., Ltd</b><br />
              <b>Waste Management Services</b><br />
              No. 253/257 (A), 11th Floor,<br />
              Corner of 29th &amp; Anawrahta Road,<br />
              Pabedan Township, Yangon, Myanmar.<br />
              www.recyglo.com
            </p>
          </div>
          <div className="div-2">
            <h4>Reliance Restricted</h4>
            <p id="info">
              <b>{organization}</b><br />
              {address1}<br />
              {address2}<br />
              {address3}
            </p>
            <div style={{ marginTop: 20 }}>
              <p id="info" style={{ float: 'left', width: '50%' }}>
                <b>Project {organization}</b>
              </p>
              <p id="info" style={{ float: 'right', width: '50%', textAlign: 'right' }}>
                <b>{date}</b>
              </p><br />
              <p id="info" style={{ fontSize: '14px', textAlign: 'justify' }}>
              Dear Sir(s), <br /><br />
              We enclose a report of our interim findings (the “Interim Report”) for the period from {formatDate(new Date(Math.min.apply(null, dates)))} to {formatDate(new Date(Math.max.apply(null, dates)))} in accordance our engagement agreement dated {formatDate(new Date(contractDate))} (the “Engagement Agreement”), for waste management service. <br /><br />
              This Interim draft Report and its contents may not be quoted, referred to or shown to any other parties except as provided in the Engagement Agreement. We accept no responsibility or liability to any person other than to {organization} and accordingly if such other persons choose to rely upon any of the contents of this Interim draft Report they do so at their own risk. <br /><br />
              References to RecyGlo Co., Ltd in the Report will relate to our advice, recommendations and analysis and will not indicate that we take any responsibility for the information concerned or are assembling or associating ourselves with any information including prospective financial information. You are solely responsible for any decision to execute or implement any such advice or recommendation, the actual execution or implementation or any thereof, the sufficiency of such advice or recommendation for your purposes, and the results of such implementation. <br /><br />
              </p>
            </div>
          </div>
        </div>
        <Footer totalPages={totalPages} currentPage={2} />
      </div>
    );
  }
}

export default Intro;
