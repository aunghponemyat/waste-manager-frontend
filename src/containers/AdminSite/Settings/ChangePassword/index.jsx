/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import { Container } from 'reactstrap';
import { changePassword } from '../../../../redux/actions/apiActions/userActions';
import ChangePasswordPage from './components/ChangePasswordPage';
// import showResults from './show';

class EditOrganization extends React.Component {
  state = {
    userId: null,
  }

  componentWillMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({
      userId: user._id,
    });
  }

  handleSubmit = (values) => {
    if (values.currentPassword && values.newPassword && values.retypePassword) {
      if (values.newPassword !== values.retypePassword) {
        alert('Passwords do not match !');
      } else {
        changePassword(this.state.userId, values.currentPassword, values.newPassword);
      }
    } else {
      alert('Please fill passwords');
    }
  }

  render() {
    return (
      <Container>
        {/* <Row>
          <Col md={12}>
            <h3 className="page-title">Change Password</h3>
          </Col>
        </Row> */}
        {/* <Row> */}
        <ChangePasswordPage
          onSubmit={this.handleSubmit}
        />
        {/* </Row> */}
      </Container>
    );
  }
}

export default EditOrganization;
