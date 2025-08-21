import React from 'react';
import {
  Card, CardBody, Col, Progress,
} from 'reactstrap';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon';

const TotalUsers = () => (
  <Col md={12} xl={3} lg={6} xs={12}>
    <Card>
      <CardBody className="dashboard__booking-card">
        <div className="dashboard__booking-total-container">
          <h5 className="dashboard__booking-total-title dashboard__booking-total-title--blue">129</h5>
          <TrendingUpIcon className="dashboard__trend-icon" />
        </div>
        <h5 className="dashboard__booking-total-description">Total Bin Orders</h5>
        <div className="progress-wrap progress-wrap--small progress-wrap--blue-gradient progress-wrap--rounded">
          <p className="dashboard__booking-card-progress-label progress__label">89%</p>
          <Progress value={89} />
        </div>
      </CardBody>
    </Card>
  </Col>
);

export default TotalUsers;
