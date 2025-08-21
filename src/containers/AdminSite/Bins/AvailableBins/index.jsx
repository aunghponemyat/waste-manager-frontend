import React from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import { FaPlus } from 'react-icons/fa';
import AvailableBinsTable from './components/AvailableBinsTable';

const AvailableBins = props => (
  <Container className="dashboard">
    <Row>
      <Col md={9}>
        <h3 className="page-title">Available Bins</h3>
      </Col>
      <Col md={3}>
        <Button
          className="icon"
          color="success"
          style={{ float: 'right' }}
          // eslint-disable-next-line react/prop-types
          onClick={() => props.history.push('/bin/add')}
        >
          <p>
            <FaPlus /> Add Bin
          </p>
        </Button>
      </Col>
    </Row>
    <Row>
      <AvailableBinsTable />
    </Row>
  </Container>
);

export default AvailableBins;
