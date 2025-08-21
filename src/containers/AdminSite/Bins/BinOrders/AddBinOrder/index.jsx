import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import AddBinOrderForm from './components/AddBinOrderForm';
import { addNewBinOrder } from '../../../../../redux/actions/apiActions/binOrderActions';

// eslint-disable-next-line react/prop-types
const AddBin = ({ dispatch }) => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Add Bin Order</h3>
      </Col>
    </Row>
    <Row>
      <AddBinOrderForm onSubmit={values => dispatch(addNewBinOrder(values))} />
    </Row>
  </Container>
);

export default connect()(AddBin);
