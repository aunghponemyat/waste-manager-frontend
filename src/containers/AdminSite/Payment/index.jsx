/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Container, Row, Card, CardBody, Button } from 'reactstrap';
import { FaPlus } from 'react-icons/fa';
import { connect } from 'react-redux';
import { textFilter } from 'react-bootstrap-table2-filter';
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
    ];
  }

  componentWillMount() {
    this.setState({
      organization: this.props.match.params.organizationId,
    });
    this.props.getPaymentsForSpecificOrganization(this.props.match.params.organizationId);
  }

  idFormatter = (cell) => {
    if (cell in ids) {
      return (<span>{JSON.stringify(ids[cell])}</span>);
    }
    count += 1;
    ids[cell] = count;
    return (<span>{JSON.stringify(count)}</span>);
  }

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
              <Row>
                <Col md={9}>
                  <h4 style={{ fontFamily: 'Poppins' }}>KBZ Bank</h4>
                  <p>Service Timeline: 12 Jul 2019 - 1 Apr 2020</p>
                </Col>
                <Col>
                  <Button
                    className="icon"
                    color="success"
                    style={{ float: 'right', background: '#77EC7366' }}
                    // eslint-disable-next-line react/prop-types
                    onClick={() => this.props.history.push(`/payment/add_new_invoice/organizations/${organization}`)}
                  >
                    <p style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: '400', color: '#2D6E43' }}>
                      <FaPlus style={{ fill: '#2D6E43' }} /> Extend Subscription
                    </p>
                  </Button>
                </Col>
              </Row>
              {payments && payments.length > 0 &&
                <ReactBootstrapTable
                  heads={this.heads}
                  rows={payments}
                />
              }
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
