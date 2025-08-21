/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { connect } from 'react-redux';

// import { CHANGE_FILTER_ORGANIZATION } from '../../../../redux/actions/apiActions/ActionTypes';
import { getMonthlyCollectedWaste } from '../../../../redux/actions/apiActions/miscActions';
import Panel from '../../../../shared/components/Panel';

class MontlyWasteCollection extends PureComponent {
  state = {
    duration: null,
  }

  componentWillMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    // eslint-disable-next-line no-underscore-dangle
    this.props.getMonthlyCollectedWaste(user.organizationId._id);
  }

  componentDidUpdate() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (this.props.duration && this.state.duration !== this.props.duration) {
      // eslint-disable-next-line no-underscore-dangle
      this.props.getMonthlyCollectedWaste(user.organizationId._id, this.props.duration);
      this.setState({ duration: this.props.duration });
    } else if (this.state.duration && this.props.duration === null) {
      // eslint-disable-next-line no-underscore-dangle
      this.props.getMonthlyCollectedWaste(user.organizationId._id);
      this.setState({ duration: this.props.duration });
    }
  }

  render() {
    // const organizationList = this.props.organizations.list;
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
        {monthlyWaste ?
          <ResponsiveContainer height={400} className="dashboard__active-users-chart">
            <BarChart
              width={600}
              height={400}
              data={monthlyWaste}
              margin={
                {
                  top: 30,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }
              }
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis
                label={{
                  value: 'Amount (kg)',
                  angle: -90,
                  position: 'insideLeft',
                }}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="Plastic" fill="#de425b" />
              <Bar dataKey="Paper" fill="#5886a5" />
              <Bar dataKey="Can" fill="#78ab63" />
              <Bar dataKey="Organic" fill="#654321" />
              <Bar dataKey="E-waste" fill="#e6dd3e" />
              <Bar dataKey="Glass" fill="#EBA434" />
            </BarChart>
          </ResponsiveContainer>
          :
          <h5 style={{ textAlign: 'center' }}>There is no waste data.</h5>
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(MontlyWasteCollection);
