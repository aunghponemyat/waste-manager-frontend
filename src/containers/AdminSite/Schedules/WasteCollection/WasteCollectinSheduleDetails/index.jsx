/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Card, CardBody, Col, Row, Container,
} from 'reactstrap';
import { connect } from 'react-redux';
import EditWasteCollectionForm from './EditWasteCollectionForm';
import { getDriverList, getOperationTeamList } from '../../../../../redux/actions/apiActions/userActions';
import { getLogisticsScheduleDetail, updateLogistics } from '../../../../../redux/actions/apiActions/logisticsActions';

class WasteCollectionScheduleDetail extends React.Component {
  state={
    logistics: null,
    logisticsDetail: {},
  }
  componentWillMount() {
    this.props.getLogisticsScheduleDetail(this.props.match.params.logisticsId);
    this.props.getDriverList();
    this.props.getOperationTeamList();
  }

  componentDidUpdate() {
    if (this.props.logistics.detail && this.props.logistics.detail !== this.state.logisticsDetail) {
      const logistics = {};
      const logisticsDetail = this.props.logistics.detail;
      logistics.organizationId = logisticsDetail.organizationId;
      logistics.pickUpTime = new Date(logisticsDetail.pickUpTime).toLocaleString();
      logistics.status = {
        label: logisticsDetail.status,
        value: logisticsDetail.status,
      };
      if (logisticsDetail.wayNumber) {
        logistics.wayNumber = logisticsDetail.wayNumber;
      }
      logistics.wayType = {
        label: logisticsDetail.wayType,
        value: logisticsDetail.wayType,
      };
      if (logisticsDetail.vehicle) {
        logistics.vehicle = logisticsDetail.vehicle;
        if (logisticsDetail.vehicle.driver) {
          logistics.vehicle.driver = {
            data: logisticsDetail.vehicle.driver,
            label: logisticsDetail.vehicle.driver.name,
            value: logisticsDetail.vehicle.driver._id,
          };
        }
      }
      if (logisticsDetail.operationTeam) {
        logistics.operationTeam = [];
        Object.keys(logisticsDetail.operationTeam).forEach((key) => {
          logistics.operationTeam.push({
            label: logisticsDetail.operationTeam[key].name,
            value: logisticsDetail.operationTeam[key]._id,
          });
        });
      }
      if (logisticsDetail.items) {
        logistics.items = [];
        Object.keys(logisticsDetail.items).forEach((key) => {
          const item = {
            productName: logisticsDetail.items[key].productName,
            productType: {
              label: logisticsDetail.items[key].productType,
              value: logisticsDetail.items[key].productType,
            },
            quantity: logisticsDetail.items[key].quantity,
            unit: {
              label: logisticsDetail.items[key].unit,
              value: logisticsDetail.items[key].unit,
            },
            remark: logisticsDetail.items[key].remark,
          };
          logistics.items.push(item);
        });
      }
      if (logisticsDetail.remark) {
        logistics.remark = logisticsDetail.remark;
      }
      if (logisticsDetail.updatedBy) {
        logistics.updatedBy = logisticsDetail.updatedBy;
      }
      this.setState({ logistics, logisticsDetail });
    }
  }

  handleSubmit = (values) => {
    const data = {};
    const user = JSON.parse(localStorage.getItem('user'));
    data.updatedBy = user._id;
    // Add Edited Vehicle Data
    if (values.vehicle) {
      data.vehicle = {};
      if (values.vehicle.plate_number) {
        data.vehicle.plate_number = values.vehicle.plate_number;
      }
      if (values.vehicle.driver) {
        data.vehicle.driver = values.vehicle.driver.value;
      }
    }

    // Add Edited Vehicle Status
    if (values.status) {
      data.status = values.status.value;
    }

    // Add Edited Operation Team
    if (values.operationTeam) {
      data.operationTeam = [];
      Object.keys(values.operationTeam).forEach((key) => {
        data.operationTeam.push(values.operationTeam[key].value);
      });
    }

    if (values.items) {
      data.items = [];
      Object.keys(values.items).forEach((key) => {
        const item = {
          productName: values.items[key].productName,
          productType: values.items[key].productType.value,
          quantity: values.items[key].quantity,
          unit: values.items[key].unit.value,
        };
        data.items.push(item);
      });
    }

    if (values.wayNumber) {
      data.wayNumber = values.wayNumber;
    } else {
      data.wayNumber = 0;
    }

    if (values.wayType) {
      data.wayType = values.wayType;
    } else {
      data.wayType = '';
    }

    if (values.remark) {
      data.remark = values.remark;
    } else {
      data.remark = ' ';
    }
    this.props.updateLogistics(data, this.props.match.params.logisticsId);
  }

  render() {
    const { logistics } = this.state;
    const { users } = this.props;
    return (
      <Container className="dashboard">
        <Row>
          <Col md={9}>
            <h3 className="page-title">Waste Collection Details</h3>
          </Col>
        </Row>
        <Row>
          <Col md={12} lg={12}>
            <Card>
              <CardBody>
                {logistics && users.drivers && users.operationTeam &&
                  <EditWasteCollectionForm
                    initialValues={logistics}
                    drivers={users.drivers}
                    operationTeam={users.operationTeam}
                    logisticsDetail={this.state.logisticsDetail}
                    onSubmit={this.handleSubmit}
                  />
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getLogisticsScheduleDetail: (logisticsId) => {
    dispatch(getLogisticsScheduleDetail(logisticsId));
  },
  getDriverList: () => {
    dispatch(getDriverList());
  },
  getOperationTeamList: () => {
    dispatch(getOperationTeamList());
  },
  updateLogistics: (data, logisticsId) => {
    dispatch(updateLogistics(data, logisticsId));
  },
});

const mapStateToProps = state => ({
  logistics: state.logistics,
  users: state.users,
});

export default connect(mapStateToProps, mapDispatchToProps)(WasteCollectionScheduleDetail);
