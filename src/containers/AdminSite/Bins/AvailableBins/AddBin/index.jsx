import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import AddBinForm from './components/AddBinForm';
import { addNewBin } from '../../../../../redux/actions/apiActions/binActions';

// eslint-disable-next-line react/prop-types
const AddBin = ({ dispatch }) => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Add Bin</h3>
      </Col>
    </Row>
    <Row>
      <AddBinForm onSubmit={values => dispatch(addNewBin(values))} />
    </Row>
  </Container>
);

export default connect()(AddBin);
