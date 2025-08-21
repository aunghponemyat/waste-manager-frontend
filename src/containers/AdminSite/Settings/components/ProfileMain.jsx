import React from 'react';
import {
  Card, CardBody, Col, Button,
} from 'reactstrap';
import MessageTextOutlineIcon from 'mdi-react/MessageTextOutlineIcon';

// const Ava = `${process.env.PUBLIC_URL}/img/ava.png`;

const ProfileMain = () => (
  <Col md={12} lg={12} xl={12}>
    <Card>
      <CardBody className="profile__card">
        <div className="profile__information">
          {/* <div className="profile__avatar">
            <img src={Ava} alt="avatar" width="100" height="100" />
          </div> */}
          <div className="profile__data">
            <p className="profile__name">Name</p>
            <p className="profile__work">Role</p>
            <p className="profile__contact">email</p>
            <p className="profile__contact">Phone Number</p>
            <Button color="primary" className="icon">
              <p><MessageTextOutlineIcon />Change Password</p>
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  </Col>
);

export default ProfileMain;
