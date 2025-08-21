/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable max-len */
import React from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import { Tab, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import CryptoJS from 'crypto-js';
import renderInputField from '../../../../../shared/components/form/FieldComponents';
import renderSelectField from '../../../../../shared/components/form/Select';
import renderCheckBoxField from '../../../../../shared/components/form/CheckBox';
import addNewOrder from '../../../../../redux/actions/apiActions/OrderActions';

const convertCurrency = {
  840: 'USD',
  104: 'MMK',
};

const logo = `${process.env.PUBLIC_URL}/recyglo-logo.png`;
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

  getPaymentData = (value, order_id) => {
    const merchant_id = '104104000000387';
    // const secret_key = 'DE8473B19F8B8E2F84838522A218B84D2D598DA5879225388A1E47B9E06ADBFC';
    const secret_key = 'B4BDE1B91B054445C14A349C913BB2411FBD921C297DA7AD12053B57A6638B77';
    const payment_description = value.productDescription;
    // const order_id = value.order_id;

    // Convert currency
    // let currency = '104';
    // if (value.currency === 'USD') {
    //   currency = '840';
    // }
    const currency = value.currency.value;

    // Convert Amount
    const pad = '000000000000';
    const str = (value.totalAmount * 100).toString();
    const amount = pad.substring(0, pad.length - str.length) + str;

    const version = '8.5';
    // const payment_url = 'https://demo2.2c2p.com/2C2PFrontEnd/RedirectV3/payment';
    const payment_url = 'https://t.2c2p.com/RedirectV3/payment';
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
        original_amount: value.totalAmount,
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
    this.getPaymentData(values, order_id);
    const data = values;
    data._id = parseInt(order_id, 0);
    data.totalAmount = parseInt(values.totalAmount, 0);
    data.currency = values.currency.label;
    delete data.tnc;
    this.setState({ customer_data: values });
    addNewOrder(data);
  }

  render() {
    const { handleSubmit } = this.props;
    const { data, customer_data } = this.state;

    return (
      <Container>
        <Row>
          <Col md={12}>
            <img src={logo} alt="" style={{ width: '100px' }} />
            RecyGlo Co. Ltd.,
          </Col>
        </Row>
        <Row style={{ margin: '10px 30px', padding: '20px', border: '1px solid #dddddd' }}>
          <Col md={12}>
            <h3 className="page-title">Order #</h3>
          </Col>
          <Col md={5}>
            {!customer_data ?
              <form className="form" onSubmit={handleSubmit(this.handleSubmit)}>
                <h4 style={{ marginBottom: 20 }}>Contact Information</h4>
                <Field
                  name="customerName"
                  type="text"
                  component={renderInputField}
                  label="Full Name"
                  placeholder="Enter Full Name"
                />
                <Field
                  name="customerEmail"
                  type="email"
                  component={renderInputField}
                  label="Email Address"
                  placeholder="Enter Email Address"
                />
                <Field
                  name="customerPhno"
                  type="text"
                  component={renderInputField}
                  label="Contact Number"
                  placeholder="Enter Contact Number"
                />
                <h4 style={{ marginBottom: 20 }}>Payment Information</h4>
                <Field
                  name="productDescription"
                  type="text"
                  component={renderInputField}
                  label="Payment Description"
                  placeholder="Enter Payment Description"
                />
                <Field
                  name="totalAmount"
                  type="text"
                  component={renderInputField}
                  label="Amount"
                  placeholder="Enter Amount"
                />
                <div className="form__form-group">
                  <span className="form__form-group-label">Currency</span>
                  <div className="form__form-group-field">
                    <Field
                      name="currency"
                      placeholder="Enter Currency"
                      component={renderSelectField}
                      options={Object.keys(convertCurrency).map((prop, key) => (
                        { key, label: convertCurrency[prop], value: prop }
                      ))
                      }
                    />
                  </div>
                </div>
                {/* <Field
                  name="currency"
                  type="text"
                  component={renderInputField}
                  label="Currency"
                  placeholder="Enter Currency"
                /> */}
                <div className="form__form-group">
                  <div className="form__form-group-field">
                    <Field
                      name="tnc"
                      component={renderCheckBoxField}
                      label="I have read and agree to the "
                      className="colored-click"
                    />
                    <a href="/terms"> &nbsp;<u>Terms and Conditions.</u></a>
                  </div>
                </div>
                <Button color="success" type="submit">Continue as Guest</Button>
              </form>
              :
              <div>
                <p>Full Name : {customer_data.customerName}</p>
                <p>Email : {customer_data.customerEmail}</p>
                <p>Phone Number : {customer_data.customerPhno}</p>
              </div>
            }
            {data &&
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
              {customer_data && <button className="btn btn-success" type="submit">Continue Payment</button>}
              {/* <Button color="success">Continue Payment</Button> */}
            </form>
            }
          </Col>
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
        </Row>
      </Container>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.customerName) {
    errors.customerName = 'Required';
  }
  if (!values.customerEmail) {
    errors.customerEmail = 'Required';
  }
  if (!values.customerPhno) {
    errors.customerPhno = 'Required';
  }
  if (!values.productDescription) {
    errors.productDescription = 'Required';
  }
  if (!values.totalAmount) {
    errors.totalAmount = 'Required';
  }
  if (!values.currency) {
    errors.currency = 'Required';
  } else if (!values.currency) {
    errors.currency = 'Required';
  }
  if (!values.tnc) {
    errors.tnc = 'Required';
  }
  console.log(errors);
  return errors;
};

// export default PaymentPage;
export default reduxForm({
  form: 'payment_information_form',
  validate,
})(connect(null)(PaymentPage));
