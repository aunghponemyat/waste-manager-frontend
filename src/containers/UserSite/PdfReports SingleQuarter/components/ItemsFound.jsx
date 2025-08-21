/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
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

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const formatDate = date => `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;

class ItemsFound extends PureComponent {
  state = {
    maxRow: 10,
  }

  itemRows = () => {
    const data = this.props.data.ways;
    const rows = [];
    let cols = [];
    for (let i = 0; i < this.state.maxRow; i += 1) {
      Object.keys(data).map(item => (
        JSON.stringify(data[item]) === '[]' ? cols.push(<td>{}</td>)
          :
          data[item].map(date => (
            date.items.length - 1 >= i
              ?
              cols.push(<td><i>{date.items[i].productName.charAt(0).toUpperCase() + date.items[i].productName.slice(1)}</i></td>)
              :
              cols.push(<td>{}</td>)
          ))
      ));
      rows.push(<tr>{cols}</tr>);
      cols = [];
    }
    return rows;
  };

  render() {
    const {
      data, totalPages, currentPage, reportDate,
    } = this.props;
    return (
      <div className="generation-page">
        <Header date={reportDate} />
        <div className="generation-content">
          <div className="generation-title">
            <div style={{ width: '70%', float: 'left' }}>
              <h5>Common Items found in waste audits</h5>
              <h4>
                Waste audit has been performed for ({Object.keys(data.ways).length} months period)
              </h4>
            </div>
            <div style={{ width: '30%' }}>
              <p>{data.quarter}</p>
            </div>
          </div>
          <table id="items-table">
            <tr>
              {Object.keys(data.ways).map(item => (
                <th colSpan={Object.keys(data.ways[item]).length}>{item}</th>
              ))}
            </tr>
            <tr>
              {Object.keys(data.ways).map(item => (
                JSON.stringify(data.ways[item]) === '[]' ? <td className="date">No Data</td>
                :
                data.ways[item].map(date => (
                  <td className="date">{formatDate(new Date(date.pickUpTime))}</td>
                ))
              ))}
            </tr>
            {this.itemRows()}
          </table>
        </div>
        <Footer totalPages={totalPages} currentPage={currentPage} />
      </div>
    );
  }
}

export default ItemsFound;
