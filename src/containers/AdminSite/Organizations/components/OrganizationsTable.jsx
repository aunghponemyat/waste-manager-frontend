/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { textFilter } from 'react-bootstrap-table2-filter';
import { connect } from 'react-redux';
// import moment from 'moment';
import ReactBootstrapTable from '../../../../shared/components/table/ReactBootstrapTable';
import { getUserType } from '../../../../redux/actions/apiActions/AuthActions';
import { getOrganizationList, deleteOrganization } from '../../../../redux/actions/apiActions/organizationActions';
import history from '../../../../shared/utils/history';

const ids = {};
let count = 0;

class OrganizationsTable extends PureComponent {
  constructor(props) {
    super(props);

    this.heads = [
      {
        dataField: 'name',
        filter: textFilter({ placeholder: 'Enter Name' }),
        // formatter: this.nameFormatter,
      },
      {
        dataField: 'companyType',
        filter: textFilter({ placeholder: 'Enter Company Type' }),
      },
      {
        dataField: 'email',
        filter: textFilter({ placeholder: 'Enter Email' }),
      },
      {
        dataField: 'address',
        filter: textFilter({ placeholder: 'Enter Address' }),
      },
      {
        dataField: 'contracts.0.startDate',
        filter: textFilter({ placeholder: 'Enter Contract Start Date' }),
        formatter: this.dateFormatter,
      },
      {
        dataField: 'contracts.0.endDate',
        filter: textFilter({ placeholder: 'Enter Contract Expiry Date' }),
        formatter: this.dateFormatter,
      },
      {
        dataField: '_id',
        text: 'Schedule',
        formatter: this.scheduleFormatter,
      },
      {
        dataField: '_id',
        text: 'Payment',
        formatter: this.paymentFormatter,
      },
      {
        dataField: '_id',
        text: 'Action',
        formatter: this.deleteButton,
      },
    ];

    this.state = {
      rows: null,
      userType: null,
    };
  }

  componentWillMount() {
    this.setState({
      userType: getUserType(),
    });
    this.props.getOrganizationList();
  }

  componentDidUpdate() {
    this.updateRows();
  }

  dateFormatter = cell => (
    <p style={{ color: 'black ' }}>{new Date(cell).toLocaleDateString()}</p>
  )

  paymentFormatter = cell => (
    <span>
      <a
        href={`/payment/organizations/${cell}`}
        style={{ color: '#777', fontWeight: '500' }}
        // eslint-disable-next-line react/jsx-no-target-blank
        target="_blank"
      >
        <button className="table-button">
          Payment
        </button>
      </a>
    </span>
  );

  scheduleFormatter = cell => (
    <span>
      <a
        href={`/organizations/schedule/${cell}`}
        style={{ color: '#777', fontWeight: '500' }}
        // eslint-disable-next-line react/jsx-no-target-blank
        target="_blank"
      >
        <button className="table-button">
          Watch
        </button>
      </a>
    </span>
  );

  idFormatter = (cell) => {
    if (cell in ids) {
      return (<span>{JSON.stringify(ids[cell])}</span>);
    }
    count += 1;
    ids[cell] = count;
    return (<span>{JSON.stringify(count)}</span>);
  }

  updateRows() {
    this.setState({ rows: this.props.organizations.list });
  }


  deleteButton = cell => (
    <Row className="table-icon">
      {this.state.userType && this.state.userType === 'SUPER ADMIN' &&
        <div style={{ width: '30px' }}>
          <p onClick={() => this.deleteOrganization(cell)} style={{ textAlign: 'center' }}><span
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

  deleteOrganization(organizationId) {
    if (window.confirm('Are you sure want to delete the organization?')) {
      this.props.deleteOrganization(organizationId);
      window.location.reload();
    }
  }

  redirectToEditPage = (organizationId) => {
    // alert('Comming Soon');
    history.push(`/organizations/edit/${organizationId}`);
    window.location.reload(true);
  }

  // rowEvents = {
  //   onClick: (e, row, rowIndex) => {
  //     console.log(`clicked on row with index: ${rowIndex}`);
  //   },
  // };


  render() {
    const { rows } = this.state;
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            {rows &&
              <ReactBootstrapTable
                style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}
                heads={this.heads}
                rows={this.state.rows}
                // rowEvents={this.rowEvents}
              />
            }
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getOrganizationList: () => {
    dispatch(getOrganizationList());
  },
  deleteOrganization: (organizationId) => {
    dispatch(deleteOrganization(organizationId));
  },
});

const mapStateToProps = state => ({
  organizations: state.organizations,
});

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationsTable);
