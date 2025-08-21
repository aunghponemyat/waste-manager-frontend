/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable camelcase */
import React, { PureComponent } from 'react';
import {
  Card, CardBody, Col, Button, ButtonToolbar, Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxWorker from 'mapbox-gl/dist/mapbox-gl-csp-worker';
// import DatePicker from 'react-datepicker';
import history from '../../../../../shared/utils/history';
import '../../../../../scss/component/date-time-picker.scss';
import StartDatePicker from './EditStartDatePicker';
import ExpiredDatePicker from './EditExpiredDatePicker';
import { CHANGE_EXPIRED_DATE, CHANGE_START_DATE, CHANGE_LOCATION } from '../../../../../redux/actions/apiActions/ActionTypes';
import renderSelectField from '../../../../../shared/components/form/Select';
// import renderDropZoneField from '../../../../../shared/components/form/DropZone';
// import renderInputField from '../../../../../shared/components/form/FieldComponents';
// import location_icon from '../../../../../shared/img/location_icon.png';
// import expand_icon from '../../../../../shared/img/Expand-icon.png';
// import marker_icon from '../../../../../shared/img/marker.png';
// import plus_icon from '../../../../../shared/img/plus_icon.png';
// import minus_icon from '../../../../../shared/img/minus_icon.png';

mapboxgl.accessToken = 'pk.eyJ1IjoicmVpbmVyLWl6LWRhYmVzdCIsImEiOiJjbWQycHZ1MnAxMG9nMmxxcGttMG0wNmZ0In0.1jd7h3E4dGlDofAXOEgBFQ';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = MapboxWorker;
const COMPANY_TYPES = [
  'Advertising',
  'Bank',
  'Beverages Manufacture',
  'Building Communities',
  'Business Building',
  'Car Rental & Transportation',
  'Clinic',
  'Consultancy of Businesses Transformation & Sustainability',
  'Consultant',
  'Embassy',
  'Fashion',
  'Garment Industries',
  'Hotel',
  'Households',
  'International Finance Corporation',
  'International School',
  'Maha Awba Agriculture Microfinance',
  'Midea & Advertising',
  'NGO',
  'RJE & Valentis Group',
  'Restaurant',
  'Shopping Mall',
  'Startup Hostel',
  'Synapse Original',
  'Telecommunication',
  'Trading',
  'Travel & Tour',
];


const renderItems = ({ fields, meta: { error, submitFailed } }) => (
  <div className="form-group">
    <div style={{ marginBottom: '10px' }}>
      <button
        className="add-contract"
        type="button"
        onClick={() => fields.push({})}
      >
        + Add Contract
      </button>
      {submitFailed && error && <span style={{ color: 'red' }}>{error}</span>}
    </div>

    {fields.map((item, index) => (
      <div
        key={item}
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px',
          background: '#fafafa',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h5 style={{ margin: 0 }}>Contract {index + 1}</h5>
          <button
            type="button"
            onClick={() => fields.remove(index)}
            style={{
              background: 'none',
              border: 'none',
              color: '#ff4861',
              cursor: 'pointer',
              fontSize: '18px',
            }}
          >
            <p style={{ textAlign: 'center' }}>
              <span
                className="lnr lnr-trash"
                style={{ color: '#ff4861', cursor: 'pointer' }}
              />
            </p>
          </button>
        </div>
        <div className="form-group">
          <label htmlFor={`${item}.startDate`}>Start Date</label>
          <Field
            id={`${item}.startDate`}
            name={`${item}.startDate`}
            component="input"
            type="text"
            placeholder="e.g. 15 July 2025"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor={`${item}.endDate`}>End Date</label>
          <Field
            id={`${item}.endDate`}
            name={`${item}.endDate`}
            component="input"
            type="text"
            placeholder="e.g. 15 July 2026"
            className="form-control"
          />
        </div>
      </div>
    ))}
  </div>
);


class EditOrganizationForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    changeLocation: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.mapContainer = React.createRef();
    this.state = {
      zoom: 12,
      location: {
        lng: 96.195129,
        lat: 16.866070,
      },
    };
    this.map = null;
  }
  componentWillMount() {
    console.log(this.state.location);
    this.props.changeLocation(this.props.initialValues.location);
    if (this.props.initialValues.location !== undefined) {
      this.setState({
        location: this.props.initialValues.location,
      });
    }
  }
  componentDidMount() {
    const { location, zoom } = this.state;
    console.log(location);
    this.map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: {
        version: 8,
        sources: {
          'raster-tiles': {
            type: 'raster',
            tiles: [
              'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
            ],
            tileSize: 256,
            attribution:
              '© OpenStreetMap contributors',
          },
        },
        layers: [
          {
            id: 'simple-tiles',
            type: 'raster',
            source: 'raster-tiles',
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
      center: [96.195129, 16.866070],
      zoom,
    });
    this.map.on('load', () => {
      setTimeout(() => {
        this.map.resize();
      }, 200);
    });
    const marker = new mapboxgl.Marker({ draggable: true })
      .setLngLat([location.lng, location.lat])
      .addTo(this.map);
    marker.on('dragend', () => {
      const { lng, lat } = marker.getLngLat();
      const newLocation = { lng: lng.toFixed(4), lat: lat.toFixed(4) };
      this.setState({ location: newLocation, zoom: this.map.getZoom().toFixed(2) });
      this.props.changeLocation(newLocation);
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
    }));
    this.map.addControl(new mapboxgl.FullscreenControl());
  }
  componentWillUnmount() {
    if (this.map) {
      this.map.remove();
    }
  }
  redirectToListingPage = () => {
    history.push('/organizations');
    window.location.reload();
  }
  render() {
    const { handleSubmit, initialValues } = this.props;
    const { location, zoom } = this.state;
    const customStyles = {
      placeholder: provided => ({
        ...provided,
        fontFamily: 'Poppins',
      }),
      control: (provided, state) => ({
        ...provided,
        backgroundColor: '#ffffff',
        width: '100%', // match the input field width
        margin: 0,
        borderColor: state.isFocused ? '#00c0d4' : '#3498db',
        boxShadow: state.isFocused ? '0 0 0 1px #00c0d4' : 'none',
        fontFamily: 'Roboto, sans-serif',
        fontSize: 14,
        color: '#333',
        height: 50,
        borderRadius: '8px', // match input style if needed
      }),
      valueContainer: provided => ({
        ...provided,
        height: '50px',
        padding: '0 14px',
        display: 'flex',
        alignItems: 'center',
      }),
      input: provided => ({
        ...provided,
        margin: 0,
        padding: 0,
        lineHeight: '1.5', // Prevent text from expanding height
      }),
      singleValue: provided => ({
        ...provided,
        color: '#2c3e50',
        fontWeight: 500,
      }),
      menu: provided => ({
        ...provided,
        backgroundColor: '#fff',
        border: '1px solid #3498db',
        fontSize: 16,
        fontFamily: 'Poppins',
      }),
      option: (provided, state) => {
        let backgroundColor;
        if (state.isSelected) {
          backgroundColor = '#3498db';
        } else if (state.isFocused) {
          backgroundColor = '#00c0d4';
        } else if (state.isDisabled) {
          return {
            ...provided,
            color: '#999',
            backgroundColor: '#f0f0f0',
            cursor: 'not-allowed',
          };
        } else {
          backgroundColor = '#fff';
        }
        return {
          ...provided,
          color: state.isSelected ? '#fff' : '#333',
          backgroundColor,
          cursor: 'pointer',
        };
      },
    };
    console.log(initialValues);
    return (
      <Col md={12} lg={12}>
        <Card className="">
          <div className="add-org">
            <div className="add-org-card">
              <CardBody>
                <form
                  className="form form--horizontal"
                  onSubmit={handleSubmit}
                >
                  <div className="form-group">
                    <label htmlFor="info">Name</label>
                    <Field
                      name="name"
                      component="input"
                      type="text"
                      placeholder="Enter Organization Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="info">Organization Info</label>
                    <Field
                      name="info"
                      component="input"
                      type="text"
                      placeholder="Enter Organization Info"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field
                      name="email"
                      component="input"
                      type="text"
                      placeholder="Enter Organization Email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="officePhoneNumber">Office Phone Number</label>
                    <Field
                      name="officePhoneNumber"
                      component="input"
                      type="text"
                      placeholder="Enter Office Phone Number"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactPersonName">Contact Person Name</label>
                    <Field
                      name="contactPersonName"
                      component="input"
                      type="text"
                      placeholder="Enter Contact Person Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactPhone">Contact Person Phone Number</label>
                    <Field
                      name="contactPersonPhoneNumber"
                      component="input"
                      type="text"
                      placeholder="Enter Contact Person Phone Number"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <Field
                      name="address"
                      component="input"
                      type="text"
                      placeholder="Enter Address"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="companyType">Company Type</label>
                    <Field
                      name="companyType"
                      placeholder="Company Type"
                      component={renderSelectField}
                      styles={customStyles}
                      options={COMPANY_TYPES
                        && COMPANY_TYPES.map((prop, key) => (
                          { key, label: prop, value: prop }
                        ))
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="startDate">Join Date</label>
                    <StartDatePicker />
                  </div>
                  <div className="form-group">
                    <label htmlFor="expiry date">Contract Expired Date</label>
                    <ExpiredDatePicker />
                  </div>
                  <div
                    style={{
                      width: '100%',
                      display: 'inline-block',
                      textAlign: 'center',
                      verticalAlign: 'top',
                      fontFamily: 'Inter',
                      fontSize: '28px',
                    }}
                  >
                    <p>Please Select your organization location</p>
                  </div>
                  <div style={{ width: '100%', paddingBottom: '20px' }}>
                    <div style={{ width: '100%', display: 'inline-block' }} name="location">
                      <div
                        className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold"
                      >
                        <div>{`Longitude: ${location.lng} Latitude: ${location.lat} Zoom: ${zoom}`}</div>
                      </div>
                      <div
                        ref={this.mapContainer}
                        style={{
                          width: '100%',
                          height: 400,
                          // minHeight: '400px',
                          display: 'block',
                          opacity: 1,
                        }}
                      />
                    </div>
                  </div>
                  <FieldArray name="contracts" component={renderItems} />
                  <Row style={{ marginTop: '15px', marginLeft: '300px' }}>
                    <ButtonToolbar className="form__button-toolbar">
                      <Button style={{ background: '#77EC7366' }} type="submit">Submit</Button>
                      <Button color="secondary" onClick={() => this.redirectToListingPage()}>
                                          Cancel
                      </Button>
                    </ButtonToolbar>
                  </Row>
                </form>
              </CardBody>
            </div>
          </div>
        </Card>
      </Col>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.info) {
    errors.info = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[a-z|0-9._%+-]+@[a-z|0-9.-]+\.[a-z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.officePhoneNumber) {
    errors.officePhoneNumber = 'Required';
  } else if (!/^([0|/+/][0-9.,-/+/\s]{6,})$/i.test(values.officePhoneNumber)) {
    errors.officePhoneNumber = 'Invalid number';
  }
  if (!values.contactPersonName) {
    errors.contactPersonName = 'Required';
  } else if (!/^([A-Z\s@]{1,})$/i.test(values.contactPersonName)) {
    errors.contactPersonName = 'Invalid';
  }
  if (!values.contactPersonPhoneNumber) {
    errors.contactPersonPhoneNumber = 'Required';
  } else if (!/^([0|/+/][0-9.,-/+/\s]{6,})$/i.test(values.contactPersonPhoneNumber)) {
    errors.contactPersonPhoneNumber = 'Invalid number';
  }
  if (!values.address) {
    errors.address = 'Required';
  }
  return errors;
};

const mapStateToProps = state => ({
  location: state.organizations.location,
});

const mapDispatchToProps = dispatch => ({
  changeStartDate: date => dispatch({
    type: CHANGE_START_DATE,
    payload: date,
  }),
  changeExpiredDate: date => dispatch({
    type: CHANGE_EXPIRED_DATE,
    payload: date,
  }),
  changeLocation: location => dispatch({
    type: CHANGE_LOCATION,
    payload: location,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'edit_organization',
  validate,
  enableReinitialize: true,
})(withTranslation('common')(EditOrganizationForm)));
