import React, { PureComponent } from 'react';
import {
  Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import renderDropZoneField from '../../../../../../shared/components/form/DropZone';

class AddBinForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <form className="form form--horizontal" onSubmit={handleSubmit}>
              <div className="form__form-group">
                <span className="form__form-group-label">Name</span>
                <div className="form__form-group-field">
                  <Field
                    name="name"
                    component="input"
                    type="text"
                    placeholder="Enter Bin Type"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Size</span>
                <div className="form__form-group-field">
                  <Field
                    name="size"
                    component="input"
                    type="text"
                    placeholder="Enter Bin Size"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Stock</span>
                <div className="form__form-group-field">
                  <Field
                    name="stock"
                    component="input"
                    type="text"
                    placeholder="Enter Available Stock"
                  />
                </div>
              </div>
              <Field
                name="image"
                component={renderDropZoneField}
              />
              <ButtonToolbar className="form__button-toolbar">
                <Button color="primary" type="submit">Submit</Button>
              </ButtonToolbar>
            </form>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default reduxForm({
  form: 'add_bin_form',
})(AddBinForm);
