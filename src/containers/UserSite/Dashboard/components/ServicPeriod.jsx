/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from "react";
import { Col } from "reactstrap";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const ServicePeriod = contracts => (
  <Col md={12} xl={12} lg={6} xs={12}>
    <div className="summary-block">
      <div className="dashboard__booking-total-container">
        <h4 className="dashboard__booking-total-title dashboard__booking-total-title--red">
          {/* eslint-disable jsx-indent */}
          {
            months[new Date(contracts.contracts.contractStartDate).getMonth()]
          }{" "}
          {new Date(contracts.contracts.contractStartDate).getFullYear()} -{" "}
          {months[new Date(contracts.contracts.contractEndDate).getMonth()]}{" "}
          {new Date(contracts.contracts.contractEndDate).getFullYear()}
        </h4>
      </div>
      <h5 className="dashboard__booking-total-description">Contract Period</h5>
      <div className="progress-wrap progress-wrap--small progress-wrap--pink-gradient progress-wrap--rounded">
        <br />
        {/* <br /> */}
        {/* <p className="dashboard__booking-card-progress-label progress__label" /> */}
        {/* <Progress value={100} /> */}
      </div>
    </div>
  </Col>
);

export default ServicePeriod;
