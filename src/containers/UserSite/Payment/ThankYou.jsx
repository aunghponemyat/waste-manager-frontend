import React from 'react';
import { Container, Row, Button } from 'reactstrap';
import { connect } from 'react-redux';
import thankyou from '../../../shared/img/ThankYou/thankyou.png';
import facebook from '../../../shared/img/ThankYou/facebook.png';
import linkedin from '../../../shared/img/ThankYou/linked-in.png';
import mail from '../../../shared/img/ThankYou/mail.png';
import web from '../../../shared/img/ThankYou/Web.png';
import history from '../../../shared/utils/history';

class ThankYou extends React.Component {
  componentWillMount() {
    console.log('a');
  }
  redirectToHomePage = () => {
    history.push('/');
    window.location.reload(true);
  }

  render() {
    return (
      <Container style={{ overflow: 'hidden', height: 'fit-content', marginTop: 20 }}>
        <Row>
          <img src={thankyou} alt="thankyou icon" className="thankyou__logo" />
        </Row>
        <Row>
          <h1 className="thankyou__header">Thank You</h1>
        </Row>
        <Row>
          <p className="thankyou__body">
            Thank you so much for your payment. We deeply appreciate you as
            our loyal customer and the timely manner in which you pay your bill each month.
            We hope you enjoy our services and look forward to serving your needs better.
            If you have any questions, please don&apos;t hestitate to send an email to &nbsp;
            <i style={{ color: '#59adff' }}>contact@recyglo.com</i>
            &nbsp;or call <color style={{ color: '#59adff' }}>+95-9-404245800</color>.
          </p>
        </Row>
        {/* <Row>
          <Button className="thankyou__button" onClick={() => this.redirectToHomePage()}>Back to Home Page</Button>
        </Row> */}
        <Row>
          <h5 className="thankyou_contact-us">Contact Us</h5>
        </Row>
        <Row style={{ marginBottom: 30 }}>
          <div style={{ display: 'inlineBlock', margin: '0 auto' }}>
            <a href="https://www.facebook.com/recyglo/">
              <img src={facebook} alt="facebook icon" className="thankyou__social-media" />
            </a>
            <a href="https://www.recyglo.com/">
              <img src={web} alt="Web icon" className="thankyou__social-media" />
            </a>
            <a href="https://www.linkedin.com/company/recyglo-company-pte-ltd/">
              <img src={linkedin} alt="LinkedIn icon" className="thankyou__social-media" />
            </a>
            <a href="mailto:winpyae@recyglo.com">
              <img src={mail} alt="Mail icon" className="thankyou__mail" />
            </a>
          </div>

        </Row>
        <Row>
          <Button
            className="btn btn-success"
            style={{ margin: '0 auto', color: 'white' }}
            href="https://www.recyglo.com/"
          >
            Go to RecyGlo Website
          </Button>
        </Row>
      </Container>
    );
  }
}
export default connect()(ThankYou);
