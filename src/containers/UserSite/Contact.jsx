/* eslint-disable max-len */
import React from "react";
import { Container, Row, Col, Form, FormGroup, Input, Button } from "reactstrap";
import address from '../../shared/img/background/address.png';
import phone from '../../shared/img/background/phone.png';
import mail from '../../shared/img/background/mail.png';
import './Contact.css'; // Make sure this file exists

const Contact = () => (
  <div className="contact-wrapper">
    {/* Banner Section */}
    <div className="contact-banner">
      <div className="overlay">
        <h4 style={{ color: 'white', fontSize: '30px', marginBottom: '10px' }}>Contact Us</h4>
        <p style={{ color: 'white' }}>
          At RecyGlo, we’re committed to providing environmentally friendly recycling solutions to businesses and organizations. Founded in 2017, our mission is to process your materials in a safe, non-hazardous manner — with an aim to keep the world environmentally clean. We believe in promoting smart recycling habits in order to achieve long-lasting results.
        </p>
      </div>
    </div>

    {/* Contact Content Section */}
    <Container className="contact-section">
      <h5 className="section-title">Get In Touch With Us</h5>
      <Row className="equal-height-row align-items-stretch">
        {/* Left: Contact Info */}
        <Col lg={6} md={12} className="d-flex">
          <div className="card-box contact-box flex-fill">
            <p className="info-title">Our team is ready to answer your questions</p>
            <div className="info-item">
              <img src={address} alt="address" />
              <p>No. 253/257 (A), 11th Floor, Corner of 29th Street, Anawrahta Road, Pabedan Township, Yangon.</p>
            </div>
            <div className="info-item">
              <img src={phone} alt="phone" />
              <p>(+95) 9 404 245 800</p>
            </div>
            <div className="info-item">
              <img src={mail} alt="email" />
              <p>contact@recyglo.com</p>
            </div>
          </div>
        </Col>

        {/* Right: Contact Form */}
        <Col lg={6} md={12} className="d-flex">
          <div className="card-box contact-form flex-fill">
            <Form>
              <FormGroup>
                <label htmlFor="name" className="form-label">Name</label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="form-input"
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="email" className="form-label">Email</label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="form-input"
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="message" className="form-label">Message</label>
                <Input
                  id="message"
                  type="textarea"
                  name="message"
                  placeholder="Enter your message"
                  className="form-input"
                  rows="3"
                />
              </FormGroup>
              <Button
                block
                style={{
                  backgroundColor: '#3b8754ff',
                  color: 'white',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px',
                }}
              >
                Send
              </Button>
            </Form>
          </div>
        </Col>

      </Row>
    </Container>
  </div>
);

export default Contact;
