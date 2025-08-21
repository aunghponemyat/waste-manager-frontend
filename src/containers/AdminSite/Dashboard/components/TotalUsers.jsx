/* eslint-disable react/prop-types */
import React from 'react';
import {
  Card, CardBody, Col, Progress,
} from 'reactstrap';
// import TrendingDownIcon from 'mdi-react/TrendingDownIcon';

const TotalUsers = ({ users }) => (
  <Col md={12} xl={3} lg={6} xs={12}>
    <Card>
      <CardBody className="dashboard__booking-card">
        <div className="dashboard__booking-total-container">
          <h5 className="dashboard__booking-total-title dashboard__booking-total-title--red">{users}</h5>
          {/* <TrendingDownIcon className="dashboard__trend-icon" /> */}
        </div>
        <h5 className="dashboard__booking-total-description">Total Users</h5>
        <div className="progress-wrap progress-wrap--small progress-wrap--pink-gradient progress-wrap--rounded">
          <p className="dashboard__booking-card-progress-label progress__label">12%</p>
          <Progress value={12} />
        </div>
      </CardBody>
    </Card>
  </Col>
);

export default TotalUsers;
