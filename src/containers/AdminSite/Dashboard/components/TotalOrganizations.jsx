/* eslint-disable react/prop-types */
import React from 'react';
import {
  Card, CardBody, Col, Progress,
} from 'reactstrap';
// import TrendingUpIcon from 'mdi-react/TrendingUpIcon';
// import TrendingDownIcon from 'mdi-react/TrendingDownIcon';

const TotalOrganizations = ({ organizations, growthRate }) => (
  <Col md={12} xl={3} lg={6} xs={12}>
    <Card>
      <CardBody className="dashboard__booking-card">
        <h5 className="dashboard__booking-total-description">Total Customers</h5>
        <div className="dashboard__booking-total-container">
          <h5 className="dashboard__booking-total-title dashboard__booking-total-title--black">{organizations}</h5>
        </div>
        <div className="progress-wrap progress-wrap--small progress-wrap--green progress-wrap--rounded">
          <p className="dashboard__booking-card-progress-label progress__label">{growthRate}%</p>
          <Progress value={growthRate} />
        </div>
      </CardBody>
    </Card>
  </Col>
);

export default TotalOrganizations;
