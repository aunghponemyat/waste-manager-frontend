/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { getBinDetail, updateBin } from '../../../../../redux/actions/apiActions/binActions';
import EditBinForm from './components/EditBinForm';
// import showResults from './show';

class EditBin extends React.Component {
  state= {
    bin: null,
    binDetail: null,
  }
  componentWillMount() {
    this.props.getBinDetail(this.props.match.params.binId);
  }

  componentDidUpdate() {
    if (this.props.bins.detail && this.props.bins.detail !== this.state.binDetail) {
      const binDetail = this.props.bins.detail;
      const bin = binDetail;
      delete bin._id;
      delete bin.__v;
      delete bin.createdAt;
      delete bin.updatedAt;
      this.setState({ bin, binDetail });
    }
  }

  handleSubmit = (values) => {
    this.props.updateBin(
      values,
      this.props.match.params.binId,
    );
  }

  render() {
    const { bin } = this.state;
    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className="page-title">Edit Bin</h3>
          </Col>
        </Row>
        <Row>
          {bin &&
            <EditBinForm
              initialValues={bin}
              onSubmit={this.handleSubmit}
            />
          }
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getBinDetail: (binId) => {
    dispatch(getBinDetail(binId));
  },
  updateBin: (data, binId) => {
    dispatch(updateBin(data, binId));
  },
});

const mapStateToProps = state => ({
  bins: state.bins,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBin);
