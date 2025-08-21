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
import { getBinOrderList, deleteBinOrder } from '../../../../../redux/actions/apiActions/binOrderActions';
import history from '../../../../../shared/utils/history';

const ids = {};
let count = 0;

class BinOrdersTable extends PureComponent {
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
        dataField: 'organization.name',
        text: 'Organization Name    ',
        filter: textFilter(),
        // formatter: this.nameFormatter,
      },
      {
        dataField: 'bin.name',
        text: 'Bin Type ',
        filter: textFilter(),
      },
      {
        dataField: 'bin.size',
        text: 'Bin Size ',
        filter: textFilter(),
      },
      {
        dataField: 'bin.image',
        text: 'Bin Photo ',
        formatter: this.imageFormatter,
      },
      {
        dataField: 'quantity',
        text: 'Quantity     ',
        filter: textFilter(),
      },
      {
        dataField: 'total',
        text: 'Total Amount ($ USD)',
        filter: textFilter(),
      },
      {
        dataField: 'status',
        text: 'Order Status      ',
        filter: textFilter(),
      },
      {
        dataField: 'orderDate',
        text: 'Order Date      ',
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
    this.props.getBinOrderList();
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
    this.setState({ rows: this.props.binOrders.list });
  }


  deleteButton = cell => (
    <Row style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '30px' }}>
        <p onClick={() => this.deleteOrganization(cell)} style={{ textAlign: 'center' }}><span
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

  redirectToEditPage = (binOrderId) => {
    history.push(`/bin/orders/edit/${binOrderId}`);
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
  getBinOrderList: () => {
    dispatch(getBinOrderList());
  },
  deleteBinOrder: (binId) => {
    dispatch(deleteBinOrder(binId));
  },
});

const mapStateToProps = state => ({
  binOrders: state.binOrders,
});

export default connect(mapStateToProps, mapDispatchToProps)(BinOrdersTable);
