/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import { Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { getOrganizationDetail, updateOrganization } from '../../../../redux/actions/apiActions/organizationActions';
// import { CHANGE_LOCATION } from '../../../../redux/actions/apiActions/ActionTypes';
import EditOrganizationForm from './components/EditOrganizationForm';
// import showResults from './show';

class EditOrganization extends React.Component {
  state= {
    organization: null,
    organizationDetail: null,
  }
  componentWillMount() {
    this.props.getOrganizationDetail(this.props.match.params.organizationId);
    // this.props.changeLocation(this.props.organizations.detail.location);
  }

  componentDidUpdate() {
    if (this.props.organizations.detail && this.props.organizations.detail !== this.state.organizationDetail) {
      const organizationDetail = this.props.organizations.detail;
      delete organizationDetail._id;
      delete organizationDetail.__v;
      delete organizationDetail.createdAt;
      delete organizationDetail.updatedAt;
      const organization = organizationDetail;
      organization.companyType = {
        label: organization.companyType,
        value: organization.companyType,
      };
      this.setState({ organization, organizationDetail });
    }
  }

  handleSubmit = (values) => {
    this.props.updateOrganization(
      values,
      this.props.match.params.organizationId,
      this.props.organizations.location,
      this.props.organizations.startDate,
      this.props.organizations.expiredDate,
    );
  }

  render() {
    const { organization } = this.state;
    return (
      <Container>
        <Row>
          {organization &&
            <EditOrganizationForm
              initialValues={organization}
              onSubmit={this.handleSubmit}
            />
          }
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getOrganizationDetail: (organizationId) => {
    dispatch(getOrganizationDetail(organizationId));
  },
  updateOrganization: (data, organizationId, location, startDate, expiredDate) => {
    dispatch(updateOrganization(data, organizationId, location, startDate, expiredDate));
  },
});

const mapStateToProps = state => ({
  organizations: state.organizations,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditOrganization);
