/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { connect } from 'react-redux';

import { getDashboardData, getGrowthRate, getTrend } from '../../../redux/actions/apiActions/miscActions';
import TotalOrganizations from './components/TotalOrganizations';
// import TotalUsers from './components/TotalUsers';
import TotalTrainings from './components/TotalTrainings';
import TotalCollectionWays from './components/TotalCollectionWays';
import TotalWasteCollections from './components/TotalWasteCollections';
import OverviewPieChart from './components/OverviewPieChart';
import TodaySchedule from './components/TodaySchedule';
import Filter from './components/Filter';
import MontlyWasteCollection from './components/MontlyWasteCollection';
import ExpiryOrganizations from './components/ExpiryOrganizations';
import TrendLineGraph from './components/TrendLineGraph';
// import MonthlyDataByOrganization from './components/MonthlyDataByOrganization';
// import PlotlyExample from './components/PlotlyExample';

class Dashboard extends React.Component {
  componentWillMount() {
    this.props.getDashboardData();
    this.props.getGrowthRate();
    this.props.getTrend();
  }

  render() {
    const { misc } = this.props;
    return (
      <Container className="dashboard">
        <Row>
          <Col md={12}>
            <h3 className="page-title">Dashboard</h3>
          </Col>
        </Row>
        <Row>
          {misc.dashboard && misc.growth_rate && misc.trend &&
            [
              (misc.dashboard.organizations && misc.growth_rate.organizations && misc.trend.organizations &&
                <TotalOrganizations
                  organizations={misc.dashboard.organizations}
                  growthRate={misc.growth_rate.organizations}
                  trend={misc.trend.organizations}
                />
              ),
              // (misc.dashboard.users &&
              //   <TotalUsers users={misc.dashboard.users} />
              // ),
              (misc.dashboard.trainings &&
                <TotalTrainings
                  trainings={misc.dashboard.trainings}
                />
              ),
              (misc.dashboard.logistics &&
                <TotalCollectionWays
                  logistics={misc.dashboard.logistics}
                />
              ),
              (misc.dashboard.collectedWastes &&
                <TotalWasteCollections
                  collectedWastes={misc.dashboard.collectedWastes}
                />
              ),
            ]
          }
          {/* <MonthlyDataByOrganization months={[
              { value: 'chocolate', label: 'Chocolate' },
              { value: 'strawberry', label: 'Strawberry' },
              { value: 'vanilla', label: 'Vanilla' },
            ]}
          /> */}
          {/* <PlotlyExample /> */}
        </Row>
        <Row>
          <TodaySchedule />
          <ExpiryOrganizations />
        </Row>
        <Row>
          <Filter />
        </Row>
        <Row>
          <OverviewPieChart />
        </Row>
        <Row>
          <MontlyWasteCollection />
        </Row>
        <TrendLineGraph />
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getDashboardData: () => {
    dispatch(getDashboardData());
  },
  getGrowthRate: () => {
    dispatch(getGrowthRate());
  },
  getTrend: () => {
    dispatch(getTrend());
  },
});

const mapStateToProps = state => ({
  misc: state.misc,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
