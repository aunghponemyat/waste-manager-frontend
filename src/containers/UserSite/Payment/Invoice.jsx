/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import jwtDecode from 'jwt-decode';
import { Col, Container, Row, Card, CardBody } from 'reactstrap';
// import { FaPlus } from 'react-icons/fa';
import { connect } from 'react-redux';
import { textFilter } from 'react-bootstrap-table2-filter';
import { getUserDetailWithPromise } from '../../../redux/actions/apiActions/userActions';
import { getPaymentsForSpecificOrganization } from '../../../redux/actions/apiActions/paymentAction';
import ReactBootstrapTable from '../../../shared/components/table/ReactBootstrapTable';

const ids = {};
let count = 0;

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organization: null,
    };

    this.heads = [
      {
        dataField: '_id',
        text: '#',
        formatter: this.idFormatter,
        headerStyle: () => ({ width: '50px', textAlign: 'center' }),
      },
      {
        dataField: 'invoiceNo',
        text: 'Invoice No',
        filter: textFilter(),
      },
      {
        dataField: 'description',
        text: 'Description ',
        filter: textFilter(),
      },
      {
        dataField: 'organization.name',
        text: 'Organization ',
        filter: textFilter(),
      },
      {
        dataField: 'invoiceDate',
        text: 'Invoice Date ',
        filter: textFilter(),
      },
      {
        dataField: 'amount',
        text: 'Amount ',
        filter: textFilter(),
      },
      {
        dataField: 'currency',
        text: 'Currency ',
        filter: textFilter(),
      },
      {
        dataField: 'paymentDueDate',
        text: 'Payment Due Date ',
        filter: textFilter(),
      },
      {
        dataField: 'paymentStatus',
        text: 'Payment Status ',
        filter: textFilter(),
      },
      {
        dataField: '_id',
        text: 'Payment ',
        formatter: this.paymentFormatter,
      },
    ];
  }

  componentWillMount() {
    this.getUserDetailAndPayment();
    // this.setState({
    //   organization: this.props.match.params.organizationId,
    // });
    // this.props.getPaymentsForSpecificOrganization(this.props.match.params.organizationId);
  }

  getUserDetailAndPayment = () => {
    const token = localStorage.getItem('jwt');
    const { id } = jwtDecode(token);
    getUserDetailWithPromise(id).then((response =>
      this.setState(
        {
          organization: response.organizationId,
        },
        this.props.getPaymentsForSpecificOrganization(response.organizationId._id),
      )
    ));
  }

  idFormatter = (cell) => {
    if (cell in ids) {
      return (<span>{JSON.stringify(ids[cell])}</span>);
    }
    count += 1;
    ids[cell] = count;
    return (<span>{JSON.stringify(count)}</span>);
  }

  paymentFormatter = cell => (
    <span>
      <a
        href={`/payment/${cell}`}
        style={{ color: '#777', fontWeight: '500' }}
      >
        Make Payment
      </a>
    </span>
  );

  render() {
    const { organization } = this.state;
    const payments = this.props.payments.list;
    console.log(organization);
    console.log(payments);
    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className="page-title">Payment &amp; Subscription</h3>
          </Col>
        </Row>
        <Col>
          <Card>
            <CardBody>
              {/* <Row>
                <Col md={9}>
                  <h3>KBZ Bank</h3>
                  <p>Service Timeline: 12 Jul 2019 - 1 Apr 2020</p>
                </Col>
                <Col>
                  <Button
                    className="icon"
                    color="success"
                    style={{ float: 'right' }}
                    // eslint-disable-next-line react/prop-types
                    onClick={() => this.props.history.push(`/payment/add_new_invoice/organizations/${organization}`)}
                  >
                    <p>
                      <FaPlus /> Extend Subscription
                    </p>
                  </Button>
                </Col>
              </Row> */}
              {payments && payments.length > 0 &&
                <ReactBootstrapTable
                  heads={this.heads}
                  rows={payments}
                />
              }
              {/* <Table responsive className="table--bordered">
                <thead>
                  <br /><br />
                  <tr>
                    <th className="invoice__header-text-style">#</th>
                    <th className="invoice__header-text-style">Description</th>
                    <th className="invoice__header-text-style">Type</th>
                    <th className="invoice__header-text-style">CCY</th>
                    <th className="invoice__header-text-style">Balance</th>
                    <th className="invoice__header-text-style">Deadline</th>
                    <th className="invoice__header-text-style">Status</th>
                    <th className="invoice__header-text-style">Payment</th>
                    <th className="invoice__header-text-style" style={{ textAlign: 'center' }}>Detail</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="invoice__header-text-style">1</td>
                    <td>Dry Waste Management Service for one year</td>
                    <td>Private</td>
                    <td>MMK</td>
                    <td>210000</td>
                    <td>10 May 2020</td>
                    <td>
                      <span className="lnr lnr-flag" style={{ color: 'red' }} />
                      &nbsp;Not Finished
                    </td>
                    <td><a href="/payment" className="invoice__payment_style">Payment</a></td>
                    <td>
                      <span className="lnr lnr-magnifier invoice__logo" />
                    </td>
                  </tr>
                  <tr>
                    <td className="invoice__header-text-style">2</td>
                    <td>Dry Waste Management Service for one year</td>
                    <td>Private</td>
                    <td>MMK</td>
                    <td>210000</td>
                    <td>26 May 2020</td>
                    <td>
                      <span className="lnr lnr-flag" style={{ color: 'red' }} />
                      &nbsp;Not Finished
                    </td>
                    <td><a href="/payment" className="invoice__payment_style">Payment</a></td>
                    <td>
                      <span className="lnr lnr-magnifier invoice__logo" />
                    </td>
                  </tr>
                  <tr>
                    <td className="invoice__header-text-style">3</td>
                    <td>Dry Waste Management Service for one year</td>
                    <td>Private</td>
                    <td>USD</td>
                    <td>100</td>
                    <td>02 June 2020</td>
                    <td>
                      <span className="lnr lnr-flag" style={{ color: 'red' }} />
                      &nbsp;Not Finished
                    </td>
                    <td><a href="/payment" className="invoice__payment_style">Payment</a></td>
                    <td>
                      <span className="lnr lnr-magnifier invoice__logo" />
                    </td>
                  </tr>
                  <tr>
                    <td className="invoice__header-text-style">4</td>
                    <td>Dry Waste Management Service for one year</td>
                    <td>Private</td>
                    <td>USD</td>
                    <td>50</td>
                    <td>02 Sep 2019</td>
                    <td>
                      <span className="lnr lnr-flag" style={{ color: '#2ecc71' }} />
                      &nbsp;Finished
                    </td>
                    <td />
                    <td>
                      <span className="lnr lnr-magnifier invoice__logo" />
                    </td>
                  </tr>
                  <tr>
                    <td className="invoice__header-text-style">5</td>
                    <td>Dry Waste Management Service for one year</td>
                    <td>Business</td>
                    <td>USD</td>
                    <td>150</td>
                    <td>10 Dec 2019</td>
                    <td className="invoice__body-text-style">
                      <span className="lnr lnr-flag" style={{ color: '#2ecc71' }} />
                      Finished
                    </td>
                    <td />
                    <td>
                      <span className="lnr lnr-magnifier invoice__logo" />
                    </td>
                  </tr>
                </tbody>
              </Table> */}
            </CardBody>
          </Card>
        </Col>
      </Container>
    );
  }
}

// export default Payment;

const mapDispatchToProps = dispatch => ({
  getPaymentsForSpecificOrganization: (organizationId) => {
    dispatch(getPaymentsForSpecificOrganization(organizationId));
  },
});

const mapStateToProps = state => ({
  payments: state.payments,
});

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
