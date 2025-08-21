/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Container, Row, Card, CardBody } from 'reactstrap';
import YearlyScheduleCalendar from './YearlyScheduleCalendar';
// import showResults from './show';

class Reporting extends React.Component {
  state = {
    organizationId: null,
  }
  componentWillMount() {
    this.setState({
      organizationId: this.props.match.params.organizationId,
    });
  }
  render() {
    const { organizationId } = this.state;
    return (
      <Container className="dashboard">
        <Row>
          <Col md={12}>
            <h3 className="page-title">Yearly Schedules</h3>
          </Col>
        </Row>
        <Row>
          <Col md={12} lg={12}>
            <Card>
              <CardBody style={{ overflowX: 'scroll' }}>
                <YearlyScheduleCalendar organizationId={organizationId} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Reporting;
