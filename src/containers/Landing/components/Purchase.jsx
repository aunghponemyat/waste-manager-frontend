import React from 'react';
import { Col, Row, Container } from 'reactstrap';

const Purchase = () => (
  <section className="landing__section">
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="landing__section-title">{"Let's Clean The World Together With "}<b>RecyGlo</b>
          </h3>
          <div className="landing__center-btn">
            <a
              className="landing__btn landing__btn--gradient"
              target="_blank"
              rel="noopener noreferrer"
              href="https://recyglo.com/contact"
            >
              Contact Us
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);

export default Purchase;
