/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import { Card, CardBody,
  Row,
  Col } from 'reactstrap';
import { textFilter } from 'react-bootstrap-table2-filter';
import { connect } from 'react-redux';
// import moment from 'moment';
import ReactBootstrapTable from '../../../../../shared/components/table/ReactBootstrapTable';
import { getTrainingList } from '../../../../../redux/actions/apiActions/trainingActions';
import history from '../../../../../shared/utils/history';

const ids = {};
let count = 0;

class TrainingTable extends PureComponent {
  constructor(props) {
    super(props);

    this.heads = [
      {
        dataField: '_id',
        text: '#',
        formatter: this.idFormatter,
        headerStyle: () => ({ width: '30px', textAlign: 'center' }),
      },
      {
        dataField: 'organizationId.name',
        text: 'Organization ',
        filter: textFilter(),
        formatter: this.nameFormatter,
      },
      {
        dataField: 'trainerName',
        text: 'Trainer Name ',
        filter: textFilter(),
        formatter: this.nameFormatter,
      },
      {
        dataField: 'topic',
        text: 'Topic  ',
        filter: textFilter(),
      },
      {
        dataField: 'type',
        text: 'Type   ',
        filter: textFilter(),
      },
      {
        dataField: 'trainingDate',
        text: 'Training Date ',
        filter: textFilter(),
      },
      {
        dataField: 'status',
        text: 'Status   ',
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
    this.props.getTrainingList();
  }

  componentDidUpdate() {
    this.updateRows();
  }

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
    <Row style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
      {/* <div style={{ width: '30px' }}>
        <p onClick={() => this.deleteOrganization(cell)} style={{ textAlign: 'center' }}><span
          className="lnr lnr-trash"
          style={{ color: '#ff4861', cursor: 'pointer' }}
        />
        </p>
      </div> */}
      <div style={{ width: '30px' }}>
        <p onClick={() => this.redirectToEditPage(cell)}><span
          className="lnr lnr-pencil"
          style={{ color: '#00c0d4', cursor: 'pointer' }}
        />
        </p>
      </div>
    </Row>
  );

  redirectToEditPage = (trainingId) => {
    history.push(`/schedule/trainings/${trainingId}`);
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
  getTrainingList: () => {
    dispatch(getTrainingList());
  },
});

const mapStateToProps = state => ({
  trainings: state.trainings,
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainingTable);
