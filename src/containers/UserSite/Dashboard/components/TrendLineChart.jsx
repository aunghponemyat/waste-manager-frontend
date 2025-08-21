/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { connect } from 'react-redux';

import { getMonthlyCollectedWaste } from '../../../../redux/actions/apiActions/miscActions';
import Panel from '../../../../shared/components/Panel';

class MonthlyDataByOrganization extends PureComponent {
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    // eslint-disable-next-line no-underscore-dangle
    this.props.getMonthlyCollectedWaste(user.organizationId._id);
  }

  componentDidUpdate(prevProps) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (this.props.duration !== prevProps.duration) {
      // eslint-disable-next-line no-underscore-dangle
      this.props.getMonthlyCollectedWaste(user.organizationId._id, this.props.duration);
    }
  }

  render() {
    const { monthlyWaste } = this.props.misc;

    return (
      <Panel
        lg={12}
        xl={12}
        md={12}
        title="Your Recycled Waste"
        subhead="Trendline of collected waste in RecyGlo's audits"
        panelClass="panel--narrow"
      >
        {monthlyWaste && monthlyWaste.length > 0 ? (
          <ResponsiveContainer height={400}>
            <LineChart
              data={monthlyWaste}
              margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                label={{
                  offset: 0,
                  value: 'Months',
                  position: 'bottom',
                }}
              />
              <YAxis
                label={{
                  value: 'Amount (kg)',
                  angle: -90,
                  position: 'insideLeft',
                }}
              />
              <Legend verticalAlign="top" height={36} />
              <Tooltip />
              <Line dataKey="Plastic" stroke="#de425b" />
              <Line dataKey="Paper" stroke="#5886a5" />
              <Line dataKey="Can" stroke="#78ab63" />
              <Line dataKey="Organic" stroke="#654321" />
              <Line dataKey="E-waste" stroke="#e6dd3e" />
              <Line dataKey="Glass" stroke="#EBA434" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p style={{ textAlign: 'center' }}>No trendline data available for the selected period.</p>
        )}
      </Panel>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getMonthlyCollectedWaste: (organizationId, duration) => {
    dispatch(getMonthlyCollectedWaste(organizationId, duration));
  },
});

const mapStateToProps = state => ({
  misc: state.misc,
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyDataByOrganization);
