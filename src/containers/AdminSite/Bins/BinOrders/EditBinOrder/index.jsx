/* eslint-disable no-param-reassign */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { getOrganizationList } from '../../../../../redux/actions/apiActions/organizationActions';
import { getBinList } from '../../../../../redux/actions/apiActions/binActions';
import { getBinOrderDetail, updateBinOrder } from '../../../../../redux/actions/apiActions/binOrderActions';
import EditBinOrderForm from './components/EditBinOrderForm';
// import showResults from './show';

class EditBinOrder extends React.Component {
  state= {
    binOrder: null,
    binOrderDetail: null,
  }
  componentWillMount() {
    this.props.getBinOrderDetail(this.props.match.params.binOrderId);
    this.props.getOrganizationList();
    this.props.getBinList();
  }

  componentDidUpdate() {
    if (this.props.binOrders.detail && this.props.binOrders.detail !== this.state.binOrderDetail) {
      const binOrderDetail = this.props.binOrders.detail;
      const binOrder = binOrderDetail;
      delete binOrder._id;
      delete binOrder.__v;
      delete binOrder.total;
      delete binOrder.createdAt;
      delete binOrder.updatedAt;
      binOrder.organization = {
        value: binOrderDetail.organization._id,
        label: binOrderDetail.organization.name,
      };
      binOrder.bin = {
        value: binOrderDetail.bin._id,
        label: `${binOrderDetail.bin.name} ${binOrderDetail.bin.size}`,
      };
      this.setState({ binOrder, binOrderDetail });
    }
  }

  handleSubmit = (values) => {
    if (values.organization) {
      values.organization = values.organization.value;
    }
    if (values.bin) {
      values.bin = values.bin.value;
    }
    if (values.quantity) {
      values.quantity = Number(values.quantity);
    }
    this.props.updateBinOrder(
      values,
      this.props.match.params.binOrderId,
    );
  }

  render() {
    const { binOrder } = this.state;
    const { bins, organizations } = this.props;
    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className="page-title">Edit Bin Order</h3>
          </Col>
        </Row>
        <Row>
          {binOrder && organizations && bins &&
            <EditBinOrderForm
              initialValues={binOrder}
              onSubmit={this.handleSubmit}
              bins={bins}
              organizations={organizations}
            />
          }
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getBinOrderDetail: (binOrderId) => {
    dispatch(getBinOrderDetail(binOrderId));
  },
  getOrganizationList: () => {
    dispatch(getOrganizationList());
  },
  getBinList: () => {
    dispatch(getBinList());
  },
  updateBinOrder: (data, binOrderId) => {
    dispatch(updateBinOrder(data, binOrderId));
  },
});

const mapStateToProps = state => ({
  binOrders: state.binOrders,
  organizations: state.organizations,
  bins: state.bins,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBinOrder);
