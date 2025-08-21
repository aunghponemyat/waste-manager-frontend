import React from 'react';
import { Col, Row, Container } from 'reactstrap';
// import { Link } from 'react-router-dom';
import Typing from 'react-typing-animation';

const background = `${process.env.PUBLIC_URL}/img/landing/header_bg.png`;
const img = `${process.env.PUBLIC_URL}/img/landing/dashboard.jpg`;

const Header = () => (
  <div className="landing__header" style={{ backgroundImage: `url(${background})` }}>
    <Container>
      <Row>
        <Col md={12}>
          <h2 className="landing__header-title">
            <Typing>
              The Best Waste Management System
            </Typing>
            {/* <b> React Bootstrap 4</b> Admin Template <br />+ <b>Seed Project</b> Inside! */}
          </h2>
          <p className="landing__header-subhead">
            We guarantee you will always get the actual statistics
            of the collected wastes
          </p>
          {/* <Link className="landing__btn landing__btn--header" to="/documentation/introduction" target="_blank">
            Check out the docs
          </Link>
          <button type="button" className="landing__btn landing__btn--header" onClick={onClick}>
            Go to demo
          </button> */}
          <img className="landing__header-img" src={img} alt="dashboard" />
        </Col>
      </Row>
    </Container>
  </div>
);

export default Header;
