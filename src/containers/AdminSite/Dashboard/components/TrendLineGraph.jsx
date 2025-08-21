/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { connect } from 'react-redux';

import { getTrendlineWaste } from '../../../../redux/actions/apiActions/miscActions';
import Panel from '../../../../shared/components/Panel';

class MonthlyDataByOrganization extends PureComponent {
  state = {
    filter: null,
  }

  componentWillMount() {
    if (this.props.misc && this.props.misc.filterOrganization) {
      this.setState({
        filter: this.props.misc.filterOrganization,
      });
    }
    this.props.getTrendlineWaste(this.props.misc.filterOrganization);
  }

  componentDidUpdate() {
    if (this.props.misc && this.state.filter !== this.props.misc.filterOrganization) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState(
        {
          filter: this.props.misc.filterOrganization,
        },
        this.props.getTrendlineWaste(this.props.misc.filterOrganization),
      );
    }
  }

  render() {
    const { trendlineWaste } = this.props.misc;

    return (
      <Panel
        lg={12}
        xl={12}
        md={12}
        title="Waste Recycling (Trend Line)"
        subhead="Monthly Waste Audit Waste Recycle from July to August"
        panelClass="panel--narrow"
      >
        {trendlineWaste &&
        <ResponsiveContainer height={400}>
          <LineChart
            // layout="vertical"
            width={600}
            height={400}
            data={trendlineWaste}
            margin={{
              top: 10, right: 30, left: 0, bottom: 30,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              label={{
                offset: 0,
                value: 'Pickup Dates',
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
            <Line dataKey="Paper" stroke="#5886a5" />

            <Line dataKey="Plastic" stroke="#de425b" />

            <Line dataKey="Can" stroke="#78ab63" />
            <Line dataKey="Glass" stroke="#fff314" />
            <Line dataKey="Organic" stroke="#654321" />
            <Line dataKey="E-waste" stroke="#FF7F00" />
          </LineChart>
        </ResponsiveContainer>
        }
      </Panel>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getTrendlineWaste: (organizationId) => {
    dispatch(getTrendlineWaste(organizationId));
  },
});

const mapStateToProps = state => ({
  misc: state.misc,
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyDataByOrganization);
