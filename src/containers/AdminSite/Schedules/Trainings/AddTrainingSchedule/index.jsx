import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import AddTraningScheduleForm from './components/AddTraningScheduleForm';
import showResults from './show';

const BasicForm = () => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Add Training Schedule</h3>
      </Col>
    </Row>
    <Row>
      <AddTraningScheduleForm onSubmit={showResults} />
    </Row>
  </Container>
);

export default withTranslation('common')(BasicForm);
