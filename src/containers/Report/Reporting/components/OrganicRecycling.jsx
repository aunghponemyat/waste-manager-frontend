/* eslint-disable react/prop-types */
/* eslint-disable quote-props */
/* eslint-disable no-loop-func */
/* eslint-disable no-return-assign */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../../../../scss/report/ItemsFound.scss';

const organic1 = `${process.env.PUBLIC_URL}/img/organic1.png`;
const organic2 = `${process.env.PUBLIC_URL}/img/organic2.png`;

class OrganicRecycling extends PureComponent {
  render() {
    const {
      totalPages, currentPage, reportDate,
    } = this.props;
    return (
      <div className="generation-page">
        <Header date={reportDate} />
        <div className="generation-content">
          <div className="generation-title">
            <div style={{ width: '100%', float: 'right' }}>
              <p>What Happened to Your Organic Waste?</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <table style={{ marginTop: '5px', width: '100%' }}>
              <tr>
                <th style={{
                  paddingRight: '5px', textAlign: 'center',
                }}
                >
                  <h3 style={{ backgroundColor: '#aaaaaa' }}>Food / Organic Recycling</h3>
                </th>
                <th style={{
                  textAlign: 'center',
                }}
                >
                  <h3 style={{ backgroundColor: '#aaaaaa' }}>Final Products</h3>
                </th>
              </tr>
              <tr>
                <td style={{ padding: '30px' }}>
                  <img style={{ width: '500px', display: 'block', margin: '0 auto' }} src={organic1} alt="image3" />
                </td>
                <td style={{ padding: '30px' }}>
                  <img style={{ width: '500px', display: 'block', margin: '0 auto' }} src={organic2} alt="image4" />
                </td>
              </tr>
            </table>
            <p style={{ color: '#00b0f0', marginLeft: '30px' }}>* This are just the sample image of the product. The design and type of the product can be changed accordingly.</p>
          </div>
        </div>
        <Footer totalPages={totalPages} currentPage={currentPage} />
      </div>
    );
  }
}

export default OrganicRecycling;
