/* eslint-disable react/prop-types */
/* eslint-disable quote-props */
/* eslint-disable no-loop-func */
/* eslint-disable no-return-assign */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
import React, { PureComponent } from 'react';
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

  // itemRows = () => {
  //   const data = this.props.data.ways;
  //   const rows = [];
  //   for (let i = 0; i < this.state.maxRow; i += 1) {
  //     const cols = Object.keys(data).map((item) => {
  //       const date = data[item][i]; // Get the date item at index i
  //       return date && date.items.length - 1 >= i ? (
  //         <td>
  //           <i>
  //             {date.items[i].productName.charAt(0).toUpperCase() + date.items[i].productName.slice(1)}
  //           </i>
  //         </td>
  //       ) : (
  //         <td>{}</td>
  //       );
  //     });
  //     rows.push(<tr key={i}>{cols}</tr>);
  //   }
  //   return rows;
  // };
  render() {
    const {
      data,
      // quarter,
    } = this.props;
    return (
      <div className="reporting-page">
        <div className="generation-content">
          <div className="generation-title">
            <div style={{ width: '70%', float: 'left' }}>
              <h5>Waste audit</h5>
              <h4>
                Common Items found in waste audits performed for ({Object.keys(data.ways).length} months period)
              </h4>
            </div>
            <div style={{ width: '30%' }}>
              <p>{data.quarter}</p>
            </div>
          </div>
          <div className="item-footprint">
            <table id="items-table">
              <tr>
                {Object.keys(data.ways).map(item => (
                  <th colSpan={data.ways[item].length}>{item}</th>
                ))}
              </tr>
              <tr>
                {Object.keys(data.ways).map(item => (
                  data.ways[item].map(date => (
                    <td className="date">{formatDate(new Date(date.pickUpTime))}</td>
                  ))
                ))}
              </tr>
              {this.itemRows()}
            </table>
          </div>
          <h4 className="audit-content">
            The Monthly Waste Composition report breaks down the percentage of paper, plastic, and cans within the waste generated each month
          </h4>
        </div>
      </div>
    );
  }
}

export default ItemsFound;
