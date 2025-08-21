/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import ReportingForm from './components/ReportingForm';
// import showResults from './show';

class Reporting extends React.Component {
  render() {
    return (
      <Container className="theme-bg">
        <Row>
          <Col md={12}>
            <h3 className="page-title">Waste Management Report</h3>
          </Col>
        </Row>
        <Row>
          <ReportingForm />
        </Row>
      </Container>
    );
  }
}

export default Reporting;
