import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import ProfileMain from './components/ProfileMain';
import ProfileCalendar from './components/ProfileCalendar';

const Calendar = () => (
  <Container>
    <div className="profile">
      <Row>
        <Col md={12} lg={12} xl={12}>
          <Row>
            <ProfileMain />
            <ProfileCalendar />
          </Row>
        </Col>
      </Row>
    </div>
  </Container>
);

export default Calendar;
