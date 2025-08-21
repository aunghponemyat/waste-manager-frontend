/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { getUserDetail, updateUser } from '../../../redux/actions/apiActions/userActions';
import EditUserForm from './components/EditUserForm';
// import showResults from './show';

class EditOrganization extends React.Component {
  componentWillMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    // eslint-disable-next-line react/destructuring-assignment
    this.props.getUserDetail(user._id);
  }

  handleSubmit = (values) => {
    const user = {
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
      isConfirm: values.isConfirm,
    };
    updateUser(user, values._id);
  }

  render() {
    const { users } = this.props;
    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className="page-title">User</h3>
          </Col>
        </Row>
        <Row>
          {users.detail
            && (
              <EditUserForm
                initialValues={users.detail}
                onSubmit={this.handleSubmit}
              />
            )
          }
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getUserDetail: (userId) => {
    dispatch(getUserDetail(userId));
  },
});

const mapStateToProps = state => ({
  users: state.users,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditOrganization);
