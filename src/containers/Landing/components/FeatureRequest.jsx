import React from 'react';
import { Col, Row, Container } from 'reactstrap';

const FeatureRequest = () => (
  <section className="landing__section">
    <Container>
      <Row>
        <Col md={12}>
          <h3 className="landing__section-title">Feature request</h3>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <p className="landing__request">
            {"We want to make the World better and we appreciate your interests. \
          If you want to subscribe our services, please click the request button and let's clean up"}
          </p>
          <div className="landing__center-btn">
            <a
              className="landing__btn"
              href="/login"
              target="_blank"
              rel="noopener noreferrer"
            >
                  Request Services
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);

export default FeatureRequest;
