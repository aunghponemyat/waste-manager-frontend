/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Container, Row, Card, CardBody } from 'reactstrap';
// import WasteCollectionTable from './components/WasteCollectionTable';
import ScheduleCalendar from './components/ScheduleCalendar';

const Logistics = () => (
  <Container className="dashboard">
    <Row>
      <Col md={9}>
        <h3 className="page-title">Waste Collection Schedules</h3>
      </Col>
    </Row>
    <Row>
      {/* <WasteCollectionTable /> */}
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <ScheduleCalendar />
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default Logistics;
