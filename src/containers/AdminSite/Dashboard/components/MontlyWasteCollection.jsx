/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
// import {
//   Col,
// } from 'reactstrap';
// import Select from 'react-select';
import { connect } from 'react-redux';

// import { CHANGE_FILTER_ORGANIZATION } from '../../../../redux/actions/apiActions/ActionTypes';
import { getMonthlyCollectedWaste } from '../../../../redux/actions/apiActions/miscActions';
// import { getOrganizationList } from '../../../../redux/actions/apiActions/organizationActions';
import Panel from '../../../../shared/components/Panel';


class MontlyWasteCollection extends PureComponent {
  state = {
    filter: null,
  }

  componentWillMount() {
    if (this.props.misc && this.props.misc.filterOrganization) {
      this.setState({
        filter: this.props.misc.filterOrganization,
      });
    }
    this.props.getMonthlyCollectedWaste(this.props.misc.filterOrganization);
  }

  componentDidUpdate() {
    if (this.props.misc && this.state.filter !== this.props.misc.filterOrganization) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState(
        {
          filter: this.props.misc.filterOrganization,
        },
        this.props.getMonthlyCollectedWaste(this.props.misc.filterOrganization),
      );
    }
  }

  render() {
    const { monthlyWaste } = this.props.misc;

    return (
      <Panel
        lg={12}
        xl={12}
        md={12}
        title="Monthly Collected Waste"
        subhead="How much waste businesses produce in comparison with the previous month"
        panelClass="panel--narrow"
      >
        {/* {organizations &&
          <Col style={{ width: 300 }}>
            <Select
              name="Organizations"
              onChange={this.handleChange}
              options={organizations}
              clearable={false}
              className="react-select"
              placeholder="Organizations"
              classNamePrefix="react-select"
            />
          </Col>
        } */}
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
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Plastic" fill="#de425b" />

              <Bar dataKey="Paper" fill="#5886a5" />
              <Bar dataKey="Can" fill="#78ab63" />
              <Bar dataKey="Glass" fill="#fff314" />
              <Bar dataKey="Organic" fill="#654321" />
              <Bar dataKey="E-waste" fill="#FF7F00" />
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
  getMonthlyCollectedWaste: (organizationId) => {
    dispatch(getMonthlyCollectedWaste(organizationId));
  },
});

const mapStateToProps = state => ({
  misc: state.misc,
});

export default connect(mapStateToProps, mapDispatchToProps)(MontlyWasteCollection);
