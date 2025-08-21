import React from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import { FaPlus } from 'react-icons/fa';
import BinOrdersTable from './components/BinOrdersTable';

const BinOrders = props => (
  <Container className="dashboard">
    <Row>
      <Col md={9}>
        <h3 className="page-title">Bin Orders</h3>
      </Col>
      <Col md={3}>
        <Button
          className="icon"
          color="success"
          style={{ float: 'right' }}
          // eslint-disable-next-line react/prop-types
          onClick={() => props.history.push('/bin/orders/add')}
        >
          <p>
            <FaPlus /> Add Bin Order
          </p>
        </Button>
      </Col>
    </Row>
    <Row>
      <BinOrdersTable />
    </Row>
  </Container>
);

export default BinOrders;
