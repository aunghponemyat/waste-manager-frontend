/* eslint-disable react/prop-types */
import React from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { Container, Row, Card, CardBody } from 'reactstrap';
import EditOrganizationForm from './components/EditOrganizationForm';
import { getUserDetailWithPromise } from '../../../redux/actions/apiActions/userActions';
import { updateOrganization } from '../../../redux/actions/apiActions/organizationActions';

// const OrganizationPage = () => (
class OrganizationPage extends React.Component {
  state = {
    organization: null,
  }

  componentWillMount() {
    this.getUserDetail();
  }

  getUserDetail = () => {
    const token = localStorage.getItem('jwt');
    const { id } = jwtDecode(token);
    getUserDetailWithPromise(id).then((response =>
      this.setState({
        organization: response.organizationId,
      })
    ));
  }

  // handleSubmit = (values) => {
  //   console.log(values);
  // }

  handleSubmit = (values) => {
    this.props.updateOrganization(
      values,
      // eslint-disable-next-line no-underscore-dangle
      this.state.organization._id,
      this.props.organizations.location,
    );
    // window.alert(this.props.organizations.location);
  }

  render() {
    const { organization } = this.state;
    return (
      <Container className="dashboard">
        <Row>
          <Card>
            <CardBody>
              {console.log(organization)}
              <h2>Update your organization detail information</h2>
              {organization &&
                <EditOrganizationForm
                  initialValues={{
                    name: organization.name,
                    info: organization.info,
                    companyType: {
                      label: organization.companyType,
                      value: organization.companyType,
                    },
                    email: organization.email,
                    officePhoneNumber: organization.officePhoneNumber,
                    contactPersonName: organization.contactPersonName,
                    contactPersonPhoneNumber: organization.contactPersonPhoneNumber,
                    address: organization.address,
                    logo: organization.logo,
                    location: organization.location,
                  }}
                  onSubmit={this.handleSubmit}
                />
              }
            </CardBody>
          </Card>
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateOrganization: (data, organizationId, location) => {
    dispatch(updateOrganization(data, organizationId, location));
  },
});
const mapStateToProps = state => ({
  organizations: state.organizations,
});
export default connect(mapStateToProps, mapDispatchToProps)(OrganizationPage);
