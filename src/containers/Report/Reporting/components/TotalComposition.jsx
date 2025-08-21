/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import Header from './Header';
import Footer from './Footer';
import TotalPieChart from './TotalPieChart';
import '../../../../scss/report/TotalComposition.scss';

const wastes = {
  Papers: 'paper',
  Plastics: 'plastic',
  Cans: 'can',
  Glasses: 'glass',
  'E-waste': 'e-waste',
  Organic: 'organic',
};

class TotalComposition extends PureComponent {
  state= {
    total: 0,
  }
  componentWillMount() {
    let { total } = this.state;
    for (const key in this.props.data) {
      total += this.props.data[key];
    }
    this.setState({ total });
  }
  render() {
    const { total } = this.state;
    const {
      data, totalPages, currentPage, quarters, months, organization, reportDate,
    } = this.props;
    return (
      <div className="total-composition-page">
        <Header date={reportDate} />
        <div className="total-composition-content">
          <div className="total-composition-title">
            <div style={{ width: '70%', float: 'left' }}>
              <h5>Waste Composition (%) </h5>
              <h4>Overall Waste Composition</h4>
            </div>
            <div style={{ width: '30%' }}>
              {quarters.length > 1 ?
                <p>Total ({quarters.length}) Quarter{quarters.length > 1 && 's'}</p> :
                quarters.map(item => (
                  <p>{item}</p>
                ))
              }
            </div>
          </div>
          <div className="total-composition-detail">
            <h5 style={{ marginTop: 40 }}>Waste Composition (%)</h5>
            {data &&
              <TotalPieChart data={data} />
            }
            <ul>
              <li style={{ textAlign: 'justify' }}>
                During the ({months.length}) months of the waste audit, the total amount of waste collected from {organization} was {total.toFixed(2)} KG which included
                {Object.keys(data).map((item, i) => (
                  <span> {((data[item] / total) * 100).toFixed(2)} % of {wastes[item]}{i < (Object.keys(data).length - 1) && <span>,</span>} {i === (Object.keys(data).length - 2) && <span>and</span>}</span>
                ))}.
              </li>
              <li>
                All collected waste was recycled and up-cycled with the commitment and dedication from {organization}.
              </li>
            </ul>
          </div>
        </div>
        <Footer totalPages={totalPages} currentPage={currentPage} />
      </div>
    );
  }
}

export default TotalComposition;
