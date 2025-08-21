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
    maxRow: 0, // Dynamically determined later
  }

  componentDidMount() {
    this.calculateMaxRow();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.calculateMaxRow();
    }
  }

  calculateMaxRow = () => {
    const { data } = this.props;
    let maxRow = 0;

    Object.keys(data.ways).forEach((item) => {
      Object.keys(data.ways[item]).forEach((month) => {
        data.ways[item][month].forEach((date) => {
          if (date.items.length > maxRow) {
            maxRow = date.items.length;
          }
        });
      });
    });

    this.setState({ maxRow });
  };

  itemRows = () => {
    const { data } = this.props;
    const rows = [];

    for (let i = 0; i < this.state.maxRow; i += 1) {
      const cols = [];

      Object.keys(data.ways).forEach((item) => {
        Object.keys(data.ways[item]).forEach((month) => {
          if (JSON.stringify(data.ways[item][month]) !== '[]') {
            data.ways[item][month].forEach((date) => {
              if (date.items.length > i) {
                cols.push(
                  <td key={`${item}-${month}-${i}`}>
                    <i>{date.items[i].productName.charAt(0).toUpperCase() + date.items[i].productName.slice(1)}</i>
                  </td>,
                );
              } else {
                cols.push(<td key={`${item}-${month}-empty-${i}`} />);
              }
            });
          }
        });
      });

      rows.push(<tr key={`row-${i}`}>{cols}</tr>);
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
                Waste audit has been performed for ({Object.keys(data.ways).length} quarters period)
              </h4>
            </div>
          </div>
          <table id="items-table">
            <tr>
              {Object.keys(data.ways).map(item => (
                <th colSpan={Object.keys(data.ways[item]).reduce((totalWays, way) => totalWays + data.ways[item][way].length, 0)}>{item}</th>
              ))}
            </tr>
            <tr>
              {Object.keys(data.ways).map(item => (
                Object.keys(data.ways[item]).map(month => (
                  data.ways[item][month].map(date => (
                    <td className="date">{formatDate(new Date(date.pickUpTime))}</td>
                  ))
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
