/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import ReportingForm from './components/ReportingForm';
// import showResults from './show';

class Reporting extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col md={12}>
            <br />
            {/* <h3 className="page-title">Waste Management Report</h3> */}
            {/* <p>Our Waste Management Report identifies, quantifies, and analyses the composition of the waste stream generated to ensure compliance with the requirements suggested by the ISO 14001-2015 requirement, YCDC, and regional environmental agencies in South East Asia. Our audit methodology collects your waste through bins and we provide you with feedback on the gathered data. Waste audit quarter reports are performed quarterlysince the starting date of the contract. We illustrate with figures the collected weight and percentage of each type of waste and the total amount of all the categories reflected in the audit for a better understanding of waste trends and facilitate decision-making on office policies.You can download the resulting quarterly reports containing the quantity and qualityof the recyclable waste in a combination of formats including graphs, charts, and spreadsheets. We also provide you with general recommendations to improve the waste management at the workplace.We very much welcome your feedback! If you have any suggestion or would love to have any more data reflected on our dashboard let us know at contact@recyglo.comor +95-9-40424-5800.</p> */}
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
