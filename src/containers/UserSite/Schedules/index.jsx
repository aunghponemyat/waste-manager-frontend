import React from 'react';
import { Col, Container, Row, Card, CardBody } from 'reactstrap';

// import SchedulesTable from './components/SchedulesTable';
// import ScheduleCalendar from './components/ScheduleCalendar';
// import DataTable from '../DataTable/index';
import YearlyCalendar from './components/YearlyCalendar';

const SchedulesPage = () => (
  <Container className="schedule-theme">
    <Row>
      <Col md={12}>
        <h3
          style={{
            fontSize: '1.8rem',
            fontWeight: 600,
            color: 'black',
            marginTop: '20px',
          }}
        >Schedule</h3>
        <p
          style={{
            fontSize: '14px',
            color: '#24a444ff',
          }}
        >
          Schedule calendar is date-based pickup streamlines time management and
          making scheduling effortless for all users.
        </p>
      </Col>
    </Row>
    <Row>
      <Col md={12} lg={12}>
        <Card className="schedule">
          <CardBody className="schedule-body" style={{ overflowX: "scroll" }}>
            <YearlyCalendar />
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default SchedulesPage;
