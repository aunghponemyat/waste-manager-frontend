/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-quotes */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { PureComponent } from 'react';
import Select from 'react-select';
import {
  Card, CardBody, Col, Button, ButtonToolbar, Row,
} from 'reactstrap';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxWorker from 'mapbox-gl/dist/mapbox-gl-csp-worker';
import { CHANGE_LOCATION } from '../../../../../redux/actions/apiActions/ActionTypes';
import '../../../../../scss/component/date-time-picker.scss';
import StartDatePicker from './StartDatePicker';
import ExpiredDatePicker from './ExpiredDatePicker';
import renderInputField from '../../../../../shared/components/form/FieldComponents';
import history from '../../../../../shared/utils/history';
import '../../../../../scss/component/add-org.scss';
// import { act } from 'react';
// import { Email } from '@material-ui/icons';

// mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhd2NoYXciLCJhIjoiY2theGNiMWhhMDU0NTJ5bm45d3JpdTZhbyJ9.jirgP7Ok6gUmSSBQpZWL9A';
mapboxgl.accessToken = 'pk.eyJ1IjoicmVpbmVyLWl6LWRhYmVzdCIsImEiOiJjbWQycHZ1MnAxMG9nMmxxcGttMG0wNmZ0In0.1jd7h3E4dGlDofAXOEgBFQ';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = MapboxWorker;

const COMPANY_TYPES = [
  'Banking',
  'Beverages Manufacture',
  'Building Communities',
  'Car Rental & Transportation',
  'Clinic',
  'Construction',
  'Cooperate',
  'Education',
  'Entrepreneurial community',
  'Hospital',
  'Hotel',
  'Households',
  'INGO',
  'Law firm',
  'Media & Advertising',
  'Micro finance',
  'NGO',
  'Public Administration (i.e. Embassy)',
  'Restaraunt',
  'Services',
  'Shopping Mall',
  'Telecommunication',
  'Trading',
  'Travel & Tour',
];

class AddOrganizationForm extends PureComponent {
  static propTypes = {
    changeStartDate: PropTypes.func.isRequired,
    changeLocation: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.mapContainer = React.createRef();
    this.state = {
      name: '',
      info: '',
      address: '',
      email: '',
      officePhoneNumber: '',
      contactPersonName: '',
      contactPersonPhoneNumber: '',
      companyType: null,
      zoom: 12,
      location: { lng: 96.195129, lat: 16.866070 },
      startDate: new Date(),
    };
    this.map = null;
    this.hiddenInput = this.hiddenInput.bind(this);
  }

  componentDidMount() {
    const { location, zoom } = this.state;
    this.map = new mapboxgl.Map({
      container: this.mapContainer.current,
      // style: 'mapbox://styles/mapbox/streets-v11',
      // center: [location.lng, location.lat],
      // zoom,
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
    handleChange = (date) => {
      console.log(date.toISOString());
      this.setState({ startDate: date });
      this.props.changeStartDate(date.toISOString());
    }

    handleValues = (selectedOption, actionMeta) => {
      if (actionMeta && actionMeta.name === 'companyType') {
        // react-select: e = selected option, actionMeta contains the name
        console.log(`Select changed: ${actionMeta.name} ->`, selectedOption);
        this.setState({ [actionMeta.name]: selectedOption });
      } else if (selectedOption.target) {
        // regular input
        const { name, value } = selectedOption.target;
        console.log(`Input changed: ${name} -> ${value}`);
        this.setState({ [name]: value });
      }
    }

    handleFormSubmit = (e) => {
      e.preventDefault();
      const {
        name,
        info,
        email,
        address,
        officePhoneNumber,
        contactPersonName,
        contactPersonPhoneNumber,
        companyType,
        startDate,
        location,
      } = this.state;
      const cpTypeValue = companyType;
      /* eslint-disable object-shorthand */
      const values = {
        name: name,
        info: info,
        email: email,
        address: address,
        officePhoneNumber: officePhoneNumber,
        contactPersonName: contactPersonName,
        contactPersonPhoneNumber: contactPersonPhoneNumber,
        companyType: companyType,
      };
      console.log("CT:", cpTypeValue);
      console.log('Submitting values:', values);
      this.props.onSubmit(values, startDate, location);
    };

    redirectToListingPage = () => {
      history.push('/organizations');
      window.location.reload();
    }

    hiddenInput = () => <input type="text" value={this.state.startDate} />

    render() {
      const { name, info, email, address, officePhoneNumber, contactPersonName, contactPersonPhoneNumber, companyType, startDate, location, zoom } = this.state;
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
      return (
        <Col md={12} lg={12}>
          <Card className="">
            <div className="add-org">
              <div className="add-org-card">
                <CardBody>
                  <form
                    className="form form--horizontal"
                    onSubmit={this.handleFormSubmit}
                  >
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={this.handleValues}
                        placeholder="Enter Organization Name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="info">Organization Info</label>
                      <input
                        id="info"
                        name="info"
                        type="text"
                        value={info}
                        onChange={this.handleValues}
                        placeholder="Enter Organization Info"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={this.handleValues}
                        placeholder="Enter Email Address"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="officePhoneNumber">Office Phone Number</label>
                      <input
                        id="phone"
                        name="officePhoneNumber"
                        type="text"
                        value={officePhoneNumber}
                        onChange={this.handleValues}
                        placeholder="Enter Office Phone Number"
                        component={renderInputField}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="contactPersonName">Contact Person Name</label>
                      <input
                        id="contact"
                        name="contactPersonName"
                        type="text"
                        value={contactPersonName}
                        onChange={this.handleValues}
                        placeholder="Enter Contact Person Name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="contactPhone">Contact Person Phone Number</label>
                      <input
                        id="contactPhone"
                        name="contactPersonPhoneNumber"
                        type="text"
                        value={contactPersonPhoneNumber}
                        onChange={this.handleValues}
                        placeholder="Enter Contact Person Phone Number"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="address">Address</label>
                      <input
                        id="address"
                        name="address"
                        type="text"
                        value={address}
                        onChange={this.handleValues}
                        placeholder="Enter Address"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="companyType">Company Type</label>
                      <Select
                        inputId="companyType"
                        name="companyType"
                        instanceId="companyType"
                        options={COMPANY_TYPES.map(prop => ({
                          label: prop,
                          value: prop,
                        }))}
                        isClearable={false}
                        value={companyType}
                        onChange={this.handleValues}
                        styles={customStyles}
                        placeholder="Company Types"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="startDate">Join Date</label>
                      <StartDatePicker
                        startDate={startDate}
                        onChange={date => this.setState({ startDate: date })}
                      />
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
                    <div style={{ width: '100%' }}>
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
  if (!values.companyType) {
    errors.companyType = 'Required';
  }
  return errors;
};

const mapStateToProps = state => ({
  location: state.organizations.location,
});

const mapDispatchToProps = dispatch => ({
  changeLocation: location => dispatch({
    type: CHANGE_LOCATION,
    payload: location,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'add_organization_form',
  enableReinitialize: true,
  validate,
})(AddOrganizationForm));
