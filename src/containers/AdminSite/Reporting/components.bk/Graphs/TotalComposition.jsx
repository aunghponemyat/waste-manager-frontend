/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import TotalPieChart from './TotalPieChart';

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
      data, organization,
    } = this.props;
    return (
      <div>
        <div className="total-composition-content">
          <div className="total-composition-detail">
            <h5>Waste Composition (%)</h5>
            {data &&
              <TotalPieChart data={data} />
            }
            <ul>
              <li>
                During the waste audit, the amount of waste collected from {organization} is total {total.toFixed(2)} KG of waste which includes
                {Object.keys(data).map((item, i) => (
                  <span> {((data[item] / total) * 100).toFixed(2)} % of {item} {i < (Object.keys(data).length - 1) && <span>,</span>}</span>
                ))}.
              </li>
              <li>
                All the collected waste has been recycled and up cycled with the commitment and dedication from {organization}.
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default TotalComposition;
