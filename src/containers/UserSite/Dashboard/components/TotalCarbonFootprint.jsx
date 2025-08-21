/* eslint-disable react/prop-types */
import React from 'react';
import {
  Card, CardBody, Col,
} from 'reactstrap';

const TotalCarbonFootprint = () => (
  <Col md={12} xl={3} lg={6} xs={12}>
    <Card>
      <CardBody className="dashboard__booking-card">
        <div className="dashboard__booking-total-container">
          {/* <h5 className="dashboard__booking-total-title dashboard__booking-total-title--green">{co2} Kgs of</h5> */}
          <h5 className="dashboard__booking-total-title dashboard__booking-total-title--green">Coming Soon</h5>
        </div>
        {/* <h5 className="dashboard__booking-total-description">Saved Carbon Footprint</h5> */}
        <h5 className="dashboard__booking-total-description">Total Carbon Footprint Saved</h5>
      </CardBody>
    </Card>
  </Col>
);

export default TotalCarbonFootprint;
