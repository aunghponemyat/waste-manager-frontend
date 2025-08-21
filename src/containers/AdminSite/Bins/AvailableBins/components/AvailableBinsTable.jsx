/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { textFilter } from 'react-bootstrap-table2-filter';
import { connect } from 'react-redux';
// import moment from 'moment';
import ReactBootstrapTable from '../../../../../shared/components/table/ReactBootstrapTable';
import { getBinList, deleteBin } from '../../../../../redux/actions/apiActions/binActions';
import history from '../../../../../shared/utils/history';

const ids = {};
let count = 0;

class AvailableBinsTable extends PureComponent {
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
        dataField: 'name',
        text: 'Waste Types    ',
        filter: textFilter(),
        // formatter: this.nameFormatter,
      },
      {
        dataField: 'size',
        text: 'Recycle Bin Size',
        filter: textFilter(),
      },
      {
        dataField: 'stock',
        text: 'Available Stock     ',
        filter: textFilter(),
      },
      {
        dataField: 'price',
        text: 'Price per unit ($ USD)     ',
        filter: textFilter(),
      },
      {
        dataField: 'image',
        text: 'Bin Image      ',
        filter: textFilter(),
        formatter: this.imageFormatter,
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
    this.props.getBinList();
  }

  componentDidUpdate() {
    this.updateRows();
  }

  nameFormatter = cell => (
    <span><a href="/organizations/profile" style={{ color: '#ccc', fontWeight: '500' }}>{ cell }</a></span>
  );

  imageFormatter = cell => (
    <span>
      {/* <a href="/organizations/profile" style={{ color: '#ccc', fontWeight: '500' }}>{ cell }</a> */}
      <img style={{ width: '100px' }} src={cell} alt="bin sample" width="100" height="100" />
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
    this.setState({ rows: this.props.bins.list });
  }


  deleteButton = cell => (
    <Row style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '30px' }}>
        <p onClick={() => this.deleteBin(cell)} style={{ textAlign: 'center' }}><span
          className="lnr lnr-trash"
          style={{ color: '#ff4861', cursor: 'pointer' }}
        />
        </p>
      </div>
      <div style={{ width: '30px' }}>
        <p onClick={() => this.redirectToEditPage(cell)}><span
          className="lnr lnr-pencil"
          style={{ color: '#00c0d4', cursor: 'pointer' }}
        />
        </p>
      </div>
    </Row>
  );

  deleteBin(binId) {
    if (window.confirm('Are you sure want to delete the bin?')) {
      this.props.deleteBin(binId);
      window.location.reload();
    }
  }

  redirectToEditPage = (binId) => {
    history.push(`/bin/edit/${binId}`);
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
            {rows &&
              <ReactBootstrapTable
                height="100px"
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
  getBinList: () => {
    dispatch(getBinList());
  },
  deleteBin: (binId) => {
    dispatch(deleteBin(binId));
  },
});

const mapStateToProps = state => ({
  bins: state.bins,
});

export default connect(mapStateToProps, mapDispatchToProps)(AvailableBinsTable);
