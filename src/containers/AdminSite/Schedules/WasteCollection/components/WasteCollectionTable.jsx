/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import { connect } from 'react-redux';

import ReactBootstrapTable from '../../../../../shared/components/table/ReactBootstrapTable';
import {
  getLogisticsScheduleList,
  deleteScheduleWithPromise,
} from '../../../../../redux/actions/apiActions/logisticsActions';
import history from '../../../../../shared/utils/history';

const ids = {};
let count = 0;

class WasteCollectionTable extends PureComponent {
  constructor() {
    super();

    const statusOptions = {
      COMPLETE: 'COMPLETE',
      ASSIGNED: 'ASSIGNED',
      ONGOING: 'ONGOING',
    };

    this.heads = [
      {
        dataField: '_id',
        text: '#',
        formatter: this.idFormatter,
        headerStyle: () => ({ width: '40px', textAlign: 'center' }),
      },
      {
        dataField: 'organizationId.name',
        text: 'Organization',
        filter: textFilter(),
      },
      // {
      //   dataField: 'phoneNumber',
      //   text: 'Phone Number',
      //   filter: textFilter(),
      // },
      {
        dataField: 'status',
        text: 'Status ',
        filter: selectFilter({
          options: statusOptions,
        }),
      },
      // {
      //   dataField: 'vehicle.plate_number',
      //   text: 'Vehicle Plate Number',
      //   filter: textFilter(),
      // },
      // {
      //   dataField: 'vehicle.driver.name',
      //   text: 'Driver',
      //   filter: textFilter(),
      // },
      {
        dataField: 'pickUpTime',
        text: 'Pick Up Time',
        filter: textFilter(),
        formatter: this.dateFormatter,
      },
      {
        dataField: '_id',
        text: '',
        formatter: this.deleteButton,
      },
    ];

    this.state = {
      rows: null,
    };
  }

  componentWillMount() {
    this.props.getLogisticsScheduleList();
    console.log(this.props.logistics.list);
  }

  componentDidUpdate() {
    this.updateRows();
  }

  updateRows() {
    this.setState({ rows: this.props.logistics.list });
  }

  idFormatter = (cell) => {
    if (cell in ids) {
      return (<span>{JSON.stringify(ids[cell])}</span>);
    }
    count += 1;
    ids[cell] = count;
    return (<span>{JSON.stringify(count)}</span>);
  }

  dateFormatter = (cell) => {
    const date = new Date(cell);
    return (<span>{date.toDateString()} {date.toLocaleTimeString()}</span>);
  }

  nameFormatter = cell => (
    <span><a href="/organizations/profile" style={{ color: '#ccc', fontWeight: '500' }}>{ cell }</a></span>
  );

  deleteButton = cell => (
    <Row style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
      {this.state.userType && (this.state.userType === 'SUPER ADMIN' || this.state.userType === 'OPERATION MANAGER') &&
        <div style={{ width: '30px' }}>
          <p onClick={() => this.deleteLogistics(cell)} style={{ textAlign: 'center' }}><span
            className="lnr lnr-trash"
            style={{ color: '#ff4861', cursor: 'pointer' }}
          />
          </p>
        </div>
      }
      <div style={{ width: '30px' }}>
        <p onClick={() => this.redirectToEditPage(cell)}><span
          className="lnr lnr-pencil"
          style={{ color: '#00c0d4', cursor: 'pointer' }}
        />
        </p>
      </div>
    </Row>
  );

  deleteLogistics(logisticsId) {
    if (window.confirm('Are you sure want to delete the organization?')) {
      this.props.deleteLogistics(logisticsId)
        .then(window.location.reload());
    }
  }

  redirectToEditPage = (logisticsId) => {
    // alert('Comming Soon');
    history.push(`/schedule/waste-collection/${logisticsId}`);
    window.location.reload(true);
  }

  render() {
    const { rows } = this.state;
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            {rows &&
              <ReactBootstrapTable
                heads={this.heads}
                rows={this.state.rows}
              />
            }
          </CardBody>
        </Card>
      </Col>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  getLogisticsScheduleList: () => {
    dispatch(getLogisticsScheduleList());
  },
  deleteScheduleWithPromise: (logisticsId) => {
    dispatch(deleteScheduleWithPromise(logisticsId));
  },
});

const mapStateToProps = state => ({
  logistics: state.logistics,
});

export default connect(mapStateToProps, mapDispatchToProps)(WasteCollectionTable);
