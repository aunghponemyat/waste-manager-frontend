import React from 'react';
import { Col, Container, Row } from 'reactstrap';

// const react = `${process.env.PUBLIC_URL}/img/landing/technologies/react.png`;
// const bootstrap = `${process.env.PUBLIC_URL}/img/landing/technologies/bootstrap-stack.png`;
// const router = `${process.env.PUBLIC_URL}/img/landing/technologies/router.png`;
// const reduxForm = `${process.env.PUBLIC_URL}/img/landing/technologies/redux_form.png`;
// const sass = `${process.env.PUBLIC_URL}/img/landing/technologies/sass.png`;
// const matUi = `${process.env.PUBLIC_URL}/img/landing/technologies/mat_ui.png`;
// const redux = `${process.env.PUBLIC_URL}/img/landing/technologies/redux.png`;

const bin = `${process.env.PUBLIC_URL}/img/bin.png`;
const training = `${process.env.PUBLIC_URL}/img/training.png`;
// const background = `${process.env.PUBLIC_URL}/img/landing/right_bg.png`;

const Technologies = () => (
  <section className="landing__section">
    {/* <img
      className="landing__section-background landing__section-background--technologies"
      src={background}
      alt=""
    /> */}
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="landing__section-title">At RecyGlo, we’re committed to providing environmentally
            friendly recycling solutions to Yangon, Myanmar, and the surrounding areas.
          </h3>
        </Col>
      </Row>
      <Row className="landing__code landing__code--first">
        <Col md={6} sm={12} xs={12}>
          <div className="landing__code-text">
            <div className="landing__code-wrap">
              <h3 className="landing__section-title">Learning &amp; Activities</h3>
              {/* <p>{'You can use the Easydev on all devices - it\'ll look great everywhere!'}</p> */}
              <p>We Provide Waste Segregation and Awareness Training</p>
            </div>
          </div>
        </Col>
        <Col md={6} sm={12} xs={12}>
          <div className="landing__code-img landing__code-img--no-shadow">
            <div className="landing__code-wrap">
              <img className="landing__img landing__img--over" src={training} alt="" />
            </div>
          </div>
          <div className="landing__center-btn">
            <a
              className="landing__btn"
              href="https://aspiritythemes.typeform.com/to/MrjOAR"
              target="_blank"
              rel="noopener noreferrer"
            >
                  Request features
            </a>
          </div>
        </Col>
      </Row>
      <Row className="landing__code">
        <Col md={6} sm={12} xs={12}>
          <div className="landing__code-text">
            <div className="landing__code-wrap">
              <h3 className="landing__section-title">Recycling Bins for Separating Recyclables from Trash</h3>
              <p>When you use a recycling bin to separate recyclables you join the worldwide recycling
                community that wants to protect the environment and save natural resources.
              </p>
            </div>
          </div>
        </Col>
        <Col md={6} sm={12} xs={12}>
          <div className="landing__code-img landing__code-img--no-shadow">
            <div className="landing__code-wrap">
              <img className="landing__img landing__img--over-right" src={bin} alt="" />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);

export default Technologies;
