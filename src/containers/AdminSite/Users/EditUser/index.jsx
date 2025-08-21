/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { getUserDetail, updateUser } from '../../../../redux/actions/apiActions/userActions';
import { getOrganizationList } from '../../../../redux/actions/apiActions/organizationActions';
import EditUserForm from './components/EditUserForm';
// import showResults from './show';

class EditUser extends React.Component {
  state= {
    user: null,
    userDetail: null,
  }
  componentWillMount() {
    this.props.getUserDetail(this.props.match.params.userId);
    this.props.getOrganizationList();
  }

  componentDidUpdate() {
    if (this.props.users.detail && this.props.users.detail !== this.state.userDetail) {
      const userDetail = this.props.users.detail;
      const user = userDetail;
      delete user._id;
      delete user.__v;
      delete user.createdAt;
      delete user.updatedAt;
      if (user.organization) {
        user.organization = {
          label: user.organization.name,
          value: user.organization._id,
        };
      }
      if (user.type) {
        user.type = {
          label: user.type,
          value: user.type,
        };
      }
      this.setState({ user, userDetail });
    }
  }

  handleSubmit = (values) => {
    updateUser(
      values,
      this.props.match.params.userId,
    );
  }

  render() {
    const { user } = this.state;
    const { organizations } = this.props;
    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className="page-title">Edit User</h3>
          </Col>
        </Row>
        <Row>
          {user && organizations &&
            <EditUserForm
              initialValues={user}
              organizations={organizations}
              onSubmit={this.handleSubmit}
            />
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
  getOrganizationList: () => {
    dispatch(getOrganizationList());
  },
});

const mapStateToProps = state => ({
  users: state.users,
  organizations: state.organizations,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
