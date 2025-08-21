/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable arrow-parens */

import React from 'react';
import { Container, Card, CardBody, Col, Row, CardHeader, Modal, Button } from 'reactstrap';
import { Tab, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import CryptoJS from 'crypto-js';
import { Field, reduxForm } from 'redux-form';

import renderCheckBoxField from '../../../shared/components/form/CheckBox';
import { getPaymentDetail } from '../../../redux/actions/apiActions/paymentAction';

const convertCurrency = {
  840: 'USD',
  104: 'MMK',
};
// const [key, setKey] = useState('home');
// const [activeTab, setActiveTab] = useState('1');
// const toggle = tab => {
//   if (activeTab !== tab) setActiveTab(tab);
// };
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

class Payment extends React.Component {
  state = {
    data: null,
    gotData: false,
    isOpen: true,
  }

  componentWillMount() {
    console.log(this.props.match.params.paymentId);
    this.props.getPaymentDetail(this.props.match.params.paymentId);
  }

  getPaymentData = (value) => {
    console.log(value);
    const merchant_id = '104104000000387';
    const secret_key = 'B4BDE1B91B054445C14A349C913BB2411FBD921C297DA7AD12053B57A6638B77';
    const payment_description = value.description;
    const order_id = new Date().getTime().toString().substring(12, 0);
    // const order_id = '1587718735379';
    let currency = '104';
    if (value.currency === 'USD') {
      currency = '840';
    }
    // const currency = '104';
    const pad = '000000000000';
    const str = (value.amount * 100).toString();
    const amount = pad.substring(0, pad.length - str.length) + str;

    // const amount = '000000002500';
    const version = '8.5';
    const payment_url = 'https://t.2c2p.com/RedirectV3/payment';
    const result_url_1 = 'https://api.recyglo.net/payment';
    const result_url_2 = 'https://api.recyglo.net/payment/get';
    // eslint-disable-next-line max-len
    const params = `${version}${merchant_id}${payment_description}${order_id}${currency}${amount}${result_url_1}${result_url_2}`;
    const hash = CryptoJS.HmacSHA256(params, secret_key, false);
    const hash_value = hash.toString();

    this.setState({
      gotData: true,
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

  closeModal = () => {
    this.setState({
      isOpen: false,
    });
  }

  handleSubmit = (values) => {
    console.log(values);
    // eslint-disable-next-line max-len
    window.open('https://t.2c2p.com/RedirectV3/payment');
    // this.setState({
    //   submitted: true,
    // });
  }

  render() {
    const { data, gotData, isOpen } = this.state;
    const { payments } = this.props;
    if (payments.detail && !gotData) {
      this.getPaymentData(payments.detail);
    }
    return (
      <Container>
        <Modal
          isOpen={isOpen}
          className="modal-dialog--success"
        >
          <div className="modal__header">
            <button className="lnr lnr-cross modal__close-btn" type="button" onClick={this.closeModal} />
            <h4 style={{ textAlign: 'left', marginBottom: 20 }}>Terms and Conditions</h4>
          </div>
          <div className="modal__body">
            <form className="form">
              <div className="form__form-group">
                <div className="form__form-group-field">
                  <Field
                    name="4ce1b6"
                    component={renderCheckBoxField}
                    defaultChecked
                    color="#4ce1b6"
                    label="I have read and agree to the "
                    className="colored"
                  />
                  <a href="/terms"> &nbsp;<u>Terms and Conditions.</u></a>
                </div>
              </div>
            </form>
            <Button
              className="icon"
              color="success"
              style={{ marginTop: 10 }}
            >
              <p>Agree and Continue</p>
            </Button>
          </div>
        </Modal>
        <Row>
          <Col md={6}>
            <Row>
              <Card style={{ marginLeft: 'initial', paddingLeft: '20px' }}>
                <CardHeader>
                  <h5>Card Info</h5>
                </CardHeader>
                <CardBody>
                  <div>
                    {data &&
                      <form id="myform" method="post" action={data.payment_url}>
                        <div>
                          <p><b style={{ fontSize: 15 }}>Description: </b>
                            {data.payment_description}
                          </p>
                          <p><b style={{ fontSize: 15 }}>Order ID: </b>
                            {data.order_id}
                          </p>
                          <p><b style={{ fontSize: 15 }}>Service Period: </b>
                            {new Date(payments.detail.servicePeriod.start).toLocaleDateString()}
                            &nbsp;-&nbsp;
                            {new Date(payments.detail.servicePeriod.end).toLocaleDateString()}
                          </p>
                          <p style={{ fontWeight: 500, fontSize: 18 }}>
                            {payments.detail.amount} {convertCurrency[data.currency]}
                          </p>
                        </div>
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
                        <input className="btn btn-success" type="submit" name="submit" value="Checkout" />
                      </form>
                    }
                    <div>
                      {/* <Nav tabs>
                        <NavItem>
                          <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { toggle('1'); }}
                          >
                            Tab1
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}
                          >
                            More Tabs
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                          <Row>
                            <Col sm="12">
                              <h4>Tab 1 Contents</h4>
                            </Col>
                          </Row>
                        </TabPane>
                      </TabContent> */}
                      {/* <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                      >
                        <Tab eventKey="home" title="Home">
                          <p>aaa</p>
                        </Tab>
                        <Tab eventKey="profile" title="Profile">
                          <p>bbb</p>
                        </Tab>
                        <Tab eventKey="contact" title="Contact" disabled>
                          <p>ccc</p>
                        </Tab>
                      </Tabs> */}
                    </div>
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
                  </div>
                </CardBody>
              </Card>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getPaymentDetail: (paymentId) => {
    dispatch(getPaymentDetail(paymentId));
  },
});

const mapStateToProps = state => ({
  payments: state.payments,
});

// export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
//   form: 'tNcCheck',
// })(connect(mapStateToProps, mapDispatchToProps)(Payment)));

export default reduxForm({
  form: 'tNc',
})(connect(mapStateToProps, mapDispatchToProps)(Payment));
