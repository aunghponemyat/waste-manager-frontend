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

class ItemsFound extends PureComponent {
  state = {
    maxRow: 0,
    months: null,
    newData: null,
  }

  componentWillMount() {
    const { data } = this.props;
    let row = 0;
    const months = [];
    const newData = {};
    Object.keys(data).map(item => (
      data[item].map(date => (
        !months.includes(new Date(date.pickUpTime).getMonth()) && months.push(new Date(date.pickUpTime).getMonth())
      ))
    ));
    // eslint-disable-next-line guard-for-in
    // eslint-disable-next-line no-restricted-syntax
    for (const item in data) {
      if (!Object.keys(newData).includes(item)) {
        newData[item] = {};
      }
      for (const way in data[item]) {
        const month = `${MONTHS[new Date(data[item][way].pickUpTime).getMonth()]} ${new Date(data[item][way].pickUpTime).getFullYear()}`;
        if (!Object.keys(newData[item]).includes(month)) {
          newData[item][month] = data[item][way].items.map(a => a.productName);
        } else {
          newData[item][month] = newData[item][month].concat(data[item][way].items.map(a => !newData[item][month].includes(a.productName) && a.productName));
        }
        newData[item][month] = newData[item][month].filter(b => b !== false);
      }
    }
    this.setState({ months });
    Object.keys(newData).map(item => (
      Object.keys(newData[item]).map(month => (
        newData[item][month].length > row
          ? row = newData[item][month].length
          :
          console.log('')
      ))
    ));
    this.setState({
      maxRow: row,
      newData,
    });
  }

  itemRows = () => {
    const { newData } = this.state;
    const rows = [];
    let cols = [];
    for (let i = 0; i < this.state.maxRow; i += 1) {
      Object.keys(newData).map(item => (
        Object.keys(newData[item]).map(month => (
          newData[item][month].length - 1 >= i
            ?
            cols.push(<td><i>{newData[item][month][i].charAt(0).toUpperCase() + newData[item][month][i].slice(1)}</i></td>)
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
    const { months, newData } = this.state;
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
                Waste audit has been performed for ({months.length} months period)
              </h4>
            </div>
            <div style={{ width: '30%' }}>
              {Object.keys(data).length > 1 ?
                <p>Total ({Object.keys(data).length}) Quarters</p>
                :
                Object.keys(data).map(item => (
                  <p>{item}</p>
                ))
              }
            </div>
          </div>
          <table id="items-table">
            <tr>
              {Object.keys(newData).map(item => (
                <th colSpan={Object.keys(newData[item]).length}>{item}</th>
              ))}
            </tr>
            <tr>
              {newData &&
                Object.keys(newData).map(item => (
                  Object.keys(newData[item]).map(month => (
                    <td className="date">{month}</td>
                  ))
                ))
              }
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
