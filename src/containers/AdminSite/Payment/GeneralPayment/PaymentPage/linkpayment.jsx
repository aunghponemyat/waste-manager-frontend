/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import React from 'react';
import { Col, Container, Row, Card, CardBody, Table } from 'reactstrap';
import { Tab, Nav } from 'react-bootstrap';
import CryptoJS from 'crypto-js';
import addNewOrder from '../../../../../redux/actions/apiActions/OrderActions';
import PaymentForm from './PaymentForm';

const batteryImg = `${process.env.PUBLIC_URL}/img/battery.png`;
// let total = 0;
// const convertCurrency = {
//   840: 'USD',
//   104: 'MMK',
// };

// const divisions = ['Ayeyarwaddy', 'Bago', 'Chin', 'Kachin', 'Kayah', 'Kayin', 'Magway', 'Mandalay', 'Mon', 'Rakhine', 'Sagaing', 'Shan', 'Tanintharyi', 'Yangon'];

const logo = `${process.env.PUBLIC_URL}/logo.png`;
const img1_link1 = `${process.env.PUBLIC_URL}/img/logo/VISA-logo.png`;
const img2_link1 = `${process.env.PUBLIC_URL}/img/logo/Mastercard-logo.png`;
const img1_link2 = `${process.env.PUBLIC_URL}/img/logo/1STOP.png`;
const img2_link2 = `${process.env.PUBLIC_URL}/img/logo/ABC.png`;
const img3_link2 = `${process.env.PUBLIC_URL}/img/logo/AOMM.png`;
const img4_link2 = `${process.env.PUBLIC_URL}/img/logo/CMTMM.png`;
const img5_link2 = `${process.env.PUBLIC_URL}/img/logo/DNK.png`;
const img6_link2 = `${process.env.PUBLIC_URL}/img/logo/ECITY.png`;
const img7_link2 = `${process.env.PUBLIC_URL}/img/logo/FFMM.png`;
const img8_link2 = `${process.env.PUBLIC_URL}/img/logo/GNG.png`;
const img9_link2 = `${process.env.PUBLIC_URL}/img/logo/LGM.png`;
const img10_link2 = `${process.env.PUBLIC_URL}/img/logo/MPMM.png`;
const img11_link2 = `${process.env.PUBLIC_URL}/img/logo/MBMM.png`;
const img12_link2 = `${process.env.PUBLIC_URL}/img/logo/MPS.png`;
const img13_link2 = `${process.env.PUBLIC_URL}/img/logo/OAS.png`;
const img14_link2 = `${process.env.PUBLIC_URL}/img/logo/OCEMM.png`;
const img15_link2 = `${process.env.PUBLIC_URL}/img/logo/SGH.png`;
const img16_link2 = `${process.env.PUBLIC_URL}/img/logo/TMN.png`;
const img17_link2 = `${process.env.PUBLIC_URL}/img/logo/WYE.png`;
const img1_link3 = `${process.env.PUBLIC_URL}/img/logo/AYA.png`;
const img2_link3 = `${process.env.PUBLIC_URL}/img/logo/CB.png`;
const img3_link3 = `${process.env.PUBLIC_URL}/img/logo/KBZPAY.png`;
const img1_link4 = `${process.env.PUBLIC_URL}/img/logo/mpu-member.png`;

class PaymentPage extends React.Component {
  state = {
    data: null,
    customer_data: null,
  }

  componentWillMount() {
    const value = {
      description: 'Sample Description',
      currency: 'MMK',
      amount: 1500,
    };
    this.getPaymentData(value);
  }

  getPaymentData = (value, order_id, currency, totalAmount) => {
    const merchant_id = '104104000000387';
    const secret_key = 'DE8473B19F8B8E2F84838522A218B84D2D598DA5879225388A1E47B9E06ADBFC';
    // const secret_key = 'B4BDE1B91B054445C14A349C913BB2411FBD921C297DA7AD12053B57A6638B77';
    const payment_description = 'Battery Recycling Service';
    // const order_id = new Date().getTime().toString().substring(12, 0);

    // Convert Amount
    const pad = '000000000000';
    const str = (totalAmount * 100).toString();
    const amount = pad.substring(0, pad.length - str.length) + str;

    const version = '8.5';
    const payment_url = 'https://demo2.2c2p.com/2C2PFrontEnd/RedirectV3/payment';
    // const payment_url = 'https://t.2c2p.com/RedirectV3/payment';
    const result_url_1 = 'https://api.recyglo.net/payment/2c2p';
    const result_url_2 = 'https://api.recyglo.net/payment/2c2p/get';
    // eslint-disable-next-line max-len
    const params = `${version}${merchant_id}${payment_description}${order_id}${currency}${amount}${result_url_1}${result_url_2}`;
    const hash = CryptoJS.HmacSHA256(params, secret_key, false);
    const hash_value = hash.toString();
    this.setState({
      data: {
        merchant_id,
        secret_key,
        payment_description,
        order_id,
        currency,
        original_amount: value.amount,
        amount,
        version,
        payment_url,
        result_url_1,
        result_url_2,
        params,
        hash_value,
      },
    });
  }

  handleSubmit = (values) => {
    console.log(values);
    const order_id = new Date().getTime().toString().substring(12, 0);
    const currency = 840;
    let totalAmount = (parseInt(values.quantity, 0) * 100);
    if (values.certificate && values.certificate === true) {
      totalAmount += 50 * parseInt(values.quantity, 0);
    }
    this.getPaymentData(values, order_id, currency, totalAmount);
    values.totalAmount = totalAmount;
    this.setState({ customer_data: values });
    const data = JSON.parse(JSON.stringify(values));
    data._id = parseInt(order_id, 0);
    data.productDescription = 'Battery Recycling Service';
    data.totalAmount = totalAmount;
    data.quantity = parseInt(values.quantity, 0);
    data.currency = 'USD';
    // delete data.certificate;
    delete data.tnc;
    addNewOrder(data);
  }

  render() {
    // const { handleSubmit } = this.props;
    const { data, customer_data } = this.state;

    return (
      <Container style={{ background: '#fafafa' }}>
        <Row>
          <Col md={12}>
            <img src={logo} alt="" style={{ width: '100px' }} />
            RecyGlo Co. Ltd.,
          </Col>
        </Row>
        <Row style={{ margin: '10px 30px', padding: '20px', border: '1px solid #dddddd' }}>
          {data.order_id ?
            <Col md={12}>
              <h3 className="page-title">Order #{data.order_id}</h3>
            </Col>
            :
            <Col md={12}>
              <h3 className="page-title">Shipping Information</h3>
            </Col>
          }
          <Col md={5}>
            {!customer_data ?
              <PaymentForm onSubmit={this.handleSubmit} />
              :
              <div>
                <h4>{customer_data.customerName}</h4>
                <h5>{customer_data.customerEmail}</h5>
                <h5>{customer_data.customerPhno}</h5>
                <Table className="table--bordered table--head-accent" style={{ marginTop: 30 }}>
                  <thead>
                    <td>Product</td>
                    <td>Quantity</td>
                    <td>Amount</td>
                  </thead>
                  <tr>
                    <td>Battery Recycling Service</td>
                    <td>{customer_data.quantity}</td>
                    <td>${parseInt(customer_data.quantity, 0) * 100} (USD)</td>
                  </tr>
                  {/* {JSON.stringify(customer_data.certificate)} */}
                  {customer_data.certificate &&
                    <tr>
                      <td>Certificate of Recycling</td>
                      <td>{customer_data.quantity}</td>
                      <td>${parseInt(customer_data.quantity, 0) * 50} (USD)</td>
                    </tr>
                  }
                  <tr>
                    <td colSpan={2}><h4>Total (VAT inclusive at 5%)</h4></td>
                    <td><h4>${customer_data.totalAmount} (USD)</h4></td>
                  </tr>
                </Table>
              </div>
            }
            <form className="form" id="myform" method="post" action={data.payment_url}>
              <input type="hidden" name="version" value="8.5" />
              <input type="hidden" name="merchant_id" value={data.merchant_id} />
              <input type="hidden" name="currency" value={data.currency} />
              <input type="hidden" name="result_url_1" value={data.result_url_1} />
              <input type="hidden" name="result_url_2" value={data.result_url_2} />
              <input
                type="hidden"
                name="hash_value"
                value={data.hash_value}
              />
              <input
                type="hidden"
                name="payment_description"
                value={data.payment_description}
                readOnly
              />
              <input type="hidden" name="order_id" value={data.order_id} readOnly />
              <input type="hidden" name="amount" value={data.amount} readOnly />
              {customer_data && <button className="btn btn-success" type="submit">Confirm</button>}
            </form>
          </Col>
          <Col md={7}>
            <Col md={12} xl={8} lg={12} xs={12}>
              <Card>
                <CardBody className="dashboard__booking-card">
                  <p
                    style={{
                      fontFamily: 'open sans,sans-serif',
                      color: '#577083',
                      fontWeight: '700',
                      fontSize: '20px',
                      marginBottom: 20,
                    }}
                  >
                    Dry Cell Battery Recycling Service
                  </p>
                  <ul style={{ color: 'rgb(87 112 131)', font: 'normal normal normal 15px/1.4em avenir-lt-w01_35-light1475496,sans-serif' }}>
                    <li style={{ lineHeight: '1.8em' }}>Dry Cell Battery Recycling Drop-off Box with User Guide</li>
                    <li style={{ lineHeight: '1.8em' }}>Weight Capacity 5kg Maximum per Box</li>
                    <li style={{ lineHeight: '1.8em' }}>Shipping Instruction to RecyGlo</li>
                    <li style={{ lineHeight: '1.8em' }}>Recycling Guideline Poster</li>
                    <li style={{ lineHeight: '1.8em' }}>Door to Door Delivery</li>
                    {/* <li style={{ lineHeight: '1.8em' }}>Certificate of Recycling of Batteries is available upon request</li> */}
                  </ul>
                  <div style={{ display: 'inline-block' }}>
                    <p
                      style={{
                        fontSize: 30,
                        lineHeight: '150px',
                        float: 'left',
                        color: '#00c0d4',
                      }}
                    >
                      $100<font style={{ fontSize: 20, color: 'rgb(87 112 131)' }}> Per Set</font>
                    </p>
                    <img src={batteryImg} style={{ width: '150px', height: '150px', float: 'right' }} alt="avatar" />
                  </div>
                </CardBody>
              </Card>
            </Col>
            {/* <Table className="table--bordered table--head-accent">
              <thead>
                <td>Product</td>
                <td>Quantity</td>
                <td>Amount</td>
              </thead>
              <tr>
                <td>{data.payment_description}</td>
                <td>1</td>
                <td>{data.original_amount} ({convertCurrency[data.currency]})</td>
              </tr>
              <tr>
                <td colSpan={2}><h5>Total</h5></td>
                <td><h5>{data.original_amount} ({convertCurrency[data.currency]})</h5></td>
              </tr>
            </Table> */}
            {/* <h5>15,000 (USD)</h5> */}
          </Col>
          {customer_data &&
            <Col md={12}>
              <Tab.Container defaultActiveKey="link-1">
                <br />
                <h4>Available Payment Options</h4>
                <br />
                <Nav variant="tabs" defaultActiveKey="/home">
                  <Nav.Item>
                    <Nav.Link eventKey="link-1">Credit/Debit Counter</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="link-2">Over the Counter</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="link-3">Bank Channels</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="link-4">MPU Card</Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content style={{ paddingTop: 10 }}>
                  <Tab.Pane eventKey="link-1">
                    <img src={img1_link1} alt="img1_link1" style={{ width: '60px', marginLeft: '10px', marginBottom: '10px' }} />
                    <img src={img2_link1} alt="img2_link1" style={{ width: '60px', marginLeft: '10px', marginBottom: '10px' }} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="link-2">
                    <img src={img1_link2} alt="img1_link2" style={{ width: '100px', marginLeft: '10px', marginBottom: '10px' }} />
                    <img src={img2_link2} alt="img2_link2" style={{ width: '100px', marginLeft: '10px', marginBottom: '10px' }} />
                    <img src={img3_link2} alt="img3_link2" style={{ width: '100px', marginLeft: '10px', marginBottom: '10px' }} />
                    <img src={img4_link2} alt="img4_link2" style={{ width: '100px', marginLeft: '10px', marginBottom: '10px' }} />
                    <img src={img5_link2} alt="img5_link2" style={{ width: '100px', marginLeft: '10px', marginBottom: '10px' }} />
                    <img src={img6_link2} alt="img6_link2" style={{ width: '100px', marginLeft: '10px', marginBottom: '10px' }} />
                    <img src={img7_link2} alt="img7_link2" style={{ width: '100px', marginLeft: '10px', marginBottom: '10px' }} />
                    <img src={img8_link2} alt="img8_link2" style={{ width: '100px', marginLeft: '10px', marginBottom: '10px' }} />
                    <img src={img9_link2} alt="img9_link2" style={{ width: '100px', marginLeft: '10px', marginBottom: '10px' }} />
                    <img src={img10_link2} alt="img10_link2" style={{ width: '100px', marginLeft: '10px', marginBottom: '10px' }} />
                    <img src={img11_link2} alt="img11_link2" style={{ width: '100px', marginLeft: '10px', marginBottom: '10px' }} />
                    <img src={img12_link2} alt="img12_link2" style={{ width: '100px', marginLeft: '10px', marginBottom: '10px' }} />
                    <img src={img13_link2} alt="img13_link2" style={{ width: '100px', marginLeft: '10px', marginBottom: '10px' }} />
                    <img src={img14_link2} alt="img14_link2" style={{ width: '100px', marginLeft: '10px', marginBottom: '10px' }} />
                    <img src={img15_link2} alt="img15_link2" style={{ width: '100px', marginLeft: '10px', marginBottom: '10px' }} />
                    <img src={img16_link2} alt="img16_link2" style={{ width: '100px', marginLeft: '10px', marginBottom: '10px' }} />
                    <img src={img17_link2} alt="img17_link2" style={{ width: '100px', marginLeft: '10px', marginBottom: '10px' }} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="link-3">
                    <img src={img1_link3} alt="img1_link3" style={{ width: '100px', marginLeft: '10px', marginBottom: '10px' }} />
                    <img src={img2_link3} alt="img2_link3" style={{ width: '100px', marginLeft: '10px', marginBottom: '10px' }} />
                    <img src={img3_link3} alt="img3_link3" style={{ width: '100px', marginLeft: '10px', marginBottom: '10px' }} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="link-4">
                    <img src={img1_link4} alt="img1_link4" />
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Col>
          }
        </Row>
      </Container>
    );
  }
}

export default PaymentPage;

