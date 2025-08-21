/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unused-state,react/no-unescaped-entities */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import { connect } from 'react-redux';
import ReactBootstrapTable from '../../../../shared/components/table/ReactBootstrapTable';
// import history from '../../../../shared/utils/history';
import { getUserType } from '../../../../redux/actions/apiActions/AuthActions';
import { getUserList, deleteUser } from '../../../../redux/actions/apiActions/userActions';
import history from '../../../../shared/utils/history';

const ids = {};
let count = 0;

class UsersTable extends PureComponent {
  constructor() {
    super();

    const userTypes = {
      'SUPER ADMIN': 'SUPER ADMIN',
      ADMIN: 'ADMIN',
      'OPERATION MANAGER': 'OPERATION MANAGER',
      'FINANNCE OFFICE': 'FINANNCE OFFICER',
      USER: 'USER',
      DRIVER: 'DRIVER',
      OPERATION: 'OPERATION',
    };

    this.heads = [
      {
        dataField: '_id',
        text: '#',
        formatter: this.idFormatter,
        headerStyle: () => ({ width: '50px', textAlign: 'center' }),
      },
      {
        dataField: 'name',
        text: 'Name ',
        filter: textFilter(),
      },
      {
        dataField: 'email',
        text: 'Email ',
        filter: textFilter(),
      },
      {
        dataField: 'type',
        text: 'User Type ',
        formatter: cell => userTypes[cell],
        filter: selectFilter({
          options: userTypes,
        }),
      },
      {
        dataField: 'organizationId.name',
        text: 'Organization ',
        filter: textFilter(),
      },
      {
        dataField: 'createdAt',
        text: 'Created Date ',
        filter: textFilter(),
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
    this.setState({
      userType: getUserType(),
    });
    // eslint-disable-next-line react/prop-types
    this.props.getUserList();
  }

  componentDidUpdate() {
    this.updateRows();
  }

  updateRows() {
    this.setState({ rows: this.props.users.list });
  }

  idFormatter = (cell) => {
    if (cell in ids) {
      return (<span>{JSON.stringify(ids[cell])}</span>);
    }
    count += 1;
    ids[cell] = count;
    return (<span>{JSON.stringify(count)}</span>);
  }

  deleteButton = cell => (
    <Row style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
      {/* <div style={{ width: '30px' }}>
        <p onClick={() => this.deleteUser(cell)} style={{ textAlign: 'center' }}><span
          className="lnr lnr-trash"
          style={{ color: '#ff4861', cursor: 'pointer' }}
        />
        </p>
      </div> */}
      {this.state.userType && this.state.userType === 'SUPER ADMIN' &&
        <div style={{ width: '30px' }}>
          <p onClick={() => this.deleteUser(cell)} style={{ textAlign: 'center' }}><span
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

  deleteUser(userId) {
    if (window.confirm(`Delete User #${userId}?`)) {
      this.props.deleteUser(userId);
    }
  }

  redirectToEditPage = (userId) => {
    history.push(`/users/edit/${userId}`);
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
                keyField="id"
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
  getUserList: () => {
    dispatch(getUserList());
  },
  deleteUser: (userId) => {
    dispatch(deleteUser(userId));
  },
});

const mapStateToProps = state => ({
  users: state.users,
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
