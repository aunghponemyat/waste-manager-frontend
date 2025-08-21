/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, CardTitle, Button } from 'reactstrap';

class EwasteTraining extends PureComponent {
  state = {
    rows: null,
  }
  render() {
    const { rows } = this.state;
    return (
      <Col md={3} lg={3}>
        {rows && JSON.stringify(rows)}
        <Card>
          {/* <CardImg
            top
            width="80%"
            // eslint-disable-next-line max-len
            src="https://static.wixstatic.com/media/22bafb_3b75889721b24a
            f69dc2b52b1c0f61e5~mv2_d_7000_7000_s_4_2.png/
            v1/fill/w_144,h_136,al_c,q_85,usm_0.66_1.00_0.01/RECYGLO_LOGO.webp"
            alt="Card image cap"
          /> */}
          <CardBody>
            <CardTitle>Waste Awareness Training</CardTitle>
            <Button onClick={() => window.open('/training/waste_awareness_training')}>View</Button>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default EwasteTraining;
