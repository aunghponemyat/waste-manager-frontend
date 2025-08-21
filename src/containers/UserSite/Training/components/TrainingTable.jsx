/* eslint-disable no-underscore-dangle */
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
import {
  getTrainingListByOrganization,
  deleteTrainingWithPromise,
} from '../../../../redux/actions/apiActions/trainingActions';
import history from '../../../../shared/utils/history';

const ids = {};
let count = 0;

class OrganizationsTable extends PureComponent {
  constructor(props) {
    super(props);

    this.heads = [
      {
        dataField: '_id',
        text: '#',
        formatter: this.idFormatter,
      },
      {
        dataField: 'topic',
        text: 'Topic   ',
        filter: textFilter(),
      },
      {
        dataField: 'trainerName',
        text: 'Training Name ',
        filter: textFilter(),
      },
      {
        dataField: 'trainingDate',
        text: 'Training Date ',
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
    const user = JSON.parse(localStorage.getItem('user'));
    this.props.getTrainingListByOrganization(user.organizationId._id);
  }

  componentDidUpdate() {
    this.updateRows();
  }

  nameFormatter = cell => (
    <span><a href="/organizations/profile" style={{ color: '#ccc', fontWeight: '500' }}>{ cell }</a></span>
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
    this.setState({ rows: this.props.trainings.list });
  }


  deleteButton = cell => (
    <Row>
      {/* <div style={{ width: '30px' }}>
        <p
          onClick={() => this.deleteTraining(cell)}
          style={{ textAlign: 'center' }}
        >
          <span
            className="lnr lnr-trash"
            style={{ color: '#ff4861', cursor: 'pointer' }}
          />
        </p>
      </div> */}
      <div style={{ width: '30px' }}>
        <p onClick={() => this.redirectToEditPage(cell)}><span
          className="lnr lnr-list"
          style={{ color: '#00c0d4', cursor: 'pointer' }}
        />
        </p>
      </div>
    </Row>
  );

  // eslint-disable-next-line class-methods-use-this
  deleteTraining(trainingId) {
    if (window.confirm('Are you sure want to delete the training?')) {
      deleteTrainingWithPromise(trainingId);
      window.location.reload();
    }
  }

  redirectToEditPage = (trainingId) => {
    // alert('Comming Soon');
    history.push(`/training/edit/${trainingId}`);
    window.location.reload(true);
  }

  // createRows = (numberOfRows) => {
  //   const rows = [];
  //   for (let i = 1; i < numberOfRows + 1; i += 1) {
  //     rows.push({
  //       id: i,
  //       name: ['BuckridgeA', 'Littel Group', 'Leuschke - Bartell'][Math.floor((Math.random() * 3))],
  //       info: ['Information of the organization', 'Blah blah', 'Info'][Math.floor((Math.random() * 3))],
  //       phoneNumber: ['0912345678', '09987654321', '09746327873'][Math.floor((Math.random() * 3))],
  //       address: ['83260 Jaylin Key', '5992 Llewellyn Run', '76834 Emilia Branch'][Math.floor((Math.random() * 3))],
  //       joinedDate: this.getRandomDate(new Date(2002, 3, 1), new Date(1954, 3, 1)),
  //     });
  //   }
  //   console.log(rows);
  //   return rows;
  // };

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
            {rows && rows.length > 0 ?
              <ReactBootstrapTable
                heads={this.heads}
                rows={this.state.rows}
                // rowEvents={this.rowEvents}
              /> :
              <p>There is no training.</p>
            }
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getTrainingListByOrganization: (organizationId) => {
    dispatch(getTrainingListByOrganization(organizationId));
  },
});

const mapStateToProps = state => ({
  trainings: state.trainings,
});

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationsTable);
