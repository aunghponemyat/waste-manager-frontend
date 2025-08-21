/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import TotalPieChart from './Graphs/TotalPieChart';
import '../../../../scss/report/TotalComposition.scss';

class TotalComposition extends PureComponent {
  calTotal = (data) => {
    let total = 0;
    for (const key in data) {
      total += data[key].value;
    }
    return total;
  }

  render() {
    const {
      data, quarter, months, organization,
    } = this.props;
    return (
      <div className="total-composition-page">
        <div className="total-composition-content">
          <div className="total-composition-title">
            <div style={{ width: '70%', float: 'left' }}>
              <h5>Waste Composition (%) </h5>
              <h4>Overall Waste Composition</h4>
            </div>
            <div style={{ width: '30%' }}>
              <p>Total ({quarter.length}) Quarters</p>
              {/* {quarters.length > 1 ?
                <p>Total ({quarters.length}) Quarter{quarters.length > 1 && 's'}</p> :
                quarters.map(item => (
                  <p>{item}</p>
                ))
              } */}
            </div>
          </div>
          <div className="total-composition-detail">
            <h5 style={{ marginTop: 40 }}>Waste Composition (%)</h5>
            {data &&
              <TotalPieChart data={data} />
            }
            <ul>
              <li style={{ textAlign: 'justify' }}>
                During the ({months.length}) months of the waste audit, the total amount of waste collected from {organization} was {this.calTotal(data).toFixed(2)} KG which included
                {data.map((item, i) => (
                  <span> {((item.value / this.calTotal(data)) * 100).toFixed(2)} % of {item.name}{i < (data.length - 1) && <span>,</span>} {i === (data.length - 2) && <span>and</span>}</span>
                  // <span>{JSON.stringify(i)}</span>
                ))}.
              </li>
              <li>
                All collected waste was recycled and up-cycled with the commitment and dedication from {organization}.
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default TotalComposition;
