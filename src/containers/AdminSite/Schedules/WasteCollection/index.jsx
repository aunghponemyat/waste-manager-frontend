/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import { FaCalendarAlt } from 'react-icons/fa';
import WasteCollectionTable from './components/WasteCollectionTable';
// import ScheduleCalendar from './components/ScheduleCalendar';

const Logistics = props => (
  <Container className="dashboard">
    {/* <Row>
      <Col md={9}>
        <h3 className="page-title">Waste Collection Schedules</h3>
      </Col>
    </Row> */}
    <Row>
      <Col md={9}>
        <h3 className="page-title">Waste Collection Schedules</h3>
      </Col>
      <Col md={3}>
        <Button
          className="icon"
          color="success"
          style={{ float: 'right' }}
          // eslint-disable-next-line react/prop-types
          onClick={() => props.history.push('/schedule/waste-collection/calendar')}
        >
          <p>
            <FaCalendarAlt /> Go To Schedule
          </p>
        </Button>
      </Col>
    </Row>
    <Row>
      <WasteCollectionTable />
      {/* <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <ScheduleCalendar />
          </CardBody>
        </Card>
      </Col> */}
    </Row>
  </Container>
);

export default Logistics;
