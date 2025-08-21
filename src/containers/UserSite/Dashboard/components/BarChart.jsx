/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getReports } from '../../../../redux/actions/apiActions/ReportsActions';

const renderColorfulLegendText = (value, entry) => {
  const { color } = entry;
  return <span style={{ color }}>{value}</span>;
};

// const SimpleLineChart = () => (
//   <Col xs={12} md={12} lg={12} xl={6}>
//     <Card>
//       <CardBody>
//         <div className="card__title">
//           <h5 className="bold-text">Yearly Report</h5>
//         </div>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart
//             width={500}
//             height={300}
//             data={data}
//             margin={{
//               top: 5, right: 30, left: 20, bottom: 5,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend formatter={renderColorfulLegendText} />
//             <Bar dataKey="eWaste" fill="#8884d8" />
//             <Bar dataKey="metal" fill="#82ca9d" />
//             <Bar dataKey="organic" fill="#ffc658" />
//           </BarChart>
//         </ResponsiveContainer>
//       </CardBody>
//     </Card>
//   </Col>
// );

class SimpleLineChart extends Component {
  state = {
    data: null,
  };

  componentWillMount() {
    this.props.getReports();
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    // console.log(this.props.reports);

    // if (nextProps.reports !== this.props.reports) {
    if (nextProps.reports.list.yearlyReport) {
      const { yearlyReport } = nextProps.reports.list;
      const reports = [];
      Object.keys(yearlyReport).forEach((key) => {
        const values = yearlyReport[key];
        const reportData = {
          name: key,
        };
        Object.keys(values).forEach((prop) => {
          reportData[prop] = values[prop].quantity;
        });
        reports.push(reportData);
      });

      this.setState({
        data: reports,
      });
    }
    // }
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  render() {
    const { data } = this.state;
    // const { reports } = this.props;
    // console.log(reports.list);

    return (
      <Col xs={12} md={12} lg={12} xl={6}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">Yearly Report</h5>
            </div>
            {data &&
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend formatter={renderColorfulLegendText} />
                  <Bar dataKey="E-Waste" fill="#fff200" />
                  <Bar dataKey="Metal" fill="#82ca9d" />
                  <Bar dataKey="Organic" fill="#654321" />
                </BarChart>
              </ResponsiveContainer>
            }
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getReports: () => {
    dispatch(getReports());
  },
});


const mapStateToProps = state => ({
  reports: state.reports,
});

SimpleLineChart.propTypes = {
  getReports: PropTypes.func.isRequired,
  reports: PropTypes.objectOf(PropTypes.object),
};

SimpleLineChart.defaultProps = {
  reports: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(SimpleLineChart);
