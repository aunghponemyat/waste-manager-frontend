/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import {
  Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import { CHANGE_LOCATION } from '../../../../redux/actions/apiActions/ActionTypes';
// import DatePicker from 'react-datepicker';
import history from '../../../../shared/utils/history';
import '../../../../scss/component/date-time-picker.scss';
// import StartDatePicker from './EditStartDatePicker';
// import ExpiredDatePicker from './EditExpiredDatePicker';
import renderSelectField from '../../../../shared/components/form/Select';
import renderDropZoneField from '../../../../shared/components/form/DropZone';
import location_icon from '../../../../shared/img/location_icon.png';
import expand_icon from '../../../../shared/img/Expand-icon.png';
import marker_icon from '../../../../shared/img/marker.png';
import plus_icon from '../../../../shared/img/plus_icon.png';
import minus_icon from '../../../../shared/img/minus_icon.png';

mapboxgl.accessToken = 'pk.eyJ1IjoicmVpbmVyLWl6LWRhYmVzdCIsImEiOiJjbWQycHZ1MnAxMG9nMmxxcGttMG0wNmZ0In0.1jd7h3E4dGlDofAXOEgBFQ';
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


class EditOrganizationForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    changeLocation: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      zoom: 12,
      location: {
        lng: 96.195129,
        lat: 16.866070,
      },
    };
  }
  componentWillMount() {
    // if (this.props.location !== null) {
    //   this.setState({
    //     lng: this.props.location.lng,
    //     lat: this.props.location.lat,
    //   });
    // }
    console.log(this.state.location);
    if (this.props.initialValues.location !== undefined) {
      this.props.changeLocation(this.props.initialValues.location);
      this.setState({
        location: this.props.initialValues.location,
      });
    }
  }
  componentDidMount() {
    const { location, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [location.lng, location.lat],
      zoom,
    });
    // marker
    let marker = document.createElement('div');
    marker.className = 'marker';
    marker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([this.state.location.lng, this.state.location.lat])
      .addTo(map);
    marker.on('dragend', () => {
      const { lng, lat } = marker.getLngLat();
      this.setState({
        location: {
          lng: lng.toFixed(4),
          lat: lat.toFixed(4),
        },
        zoom: map.getZoom().toFixed(2),
      });
      console.log(this.state.location);
      this.props.changeLocation((this.state.location));
    });
    // zoom in zoom out
    map.addControl(new mapboxgl.NavigationControl());
    // current location
    map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    }));
    // full screen
    map.addControl(new mapboxgl.FullscreenControl());
  }
  mapRef = React.createRef();

  // state = {
  //   startDate: null,
  //   expiredDate: null,
  // }

  // handleChange = date => this.setState({ date })

  // componentWillMount() {
  //   const { startDate, expiredDate } = this.props.initialValues;
  //   this.setState({
  //     startDate, expiredDate,
  //   });
  //   this.props.changeStartDate(startDate);
  //   this.props.changeExpiredDate(expiredDate);
  // }

  redirectToListingPage = () => {
    history.push('/');
    window.location.reload();
  }

  render() {
    const { handleSubmit, initialValues } = this.props;
    const { location, zoom } = this.state;
    console.log(this.state.location);
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <form className="form form--horizontal" onSubmit={handleSubmit}>
              <div className="form__form-group">
                <span className="form__form-group-label">Organization</span>
                <div className="form__form-group-field">
                  <Field
                    name="name"
                    component="input"
                    type="text"
                    placeholder="Enter Organization Name"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Info</span>
                <div className="form__form-group-field">
                  <Field
                    name="info"
                    component="input"
                    type="text"
                    placeholder="Enter Organization Info"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Company Type</span>
                <div className="form__form-group-field">
                  <Field
                    name="companyType"
                    placeholder="Company Type"
                    component={renderSelectField}
                    options={COMPANY_TYPES
                      && COMPANY_TYPES.map((prop, key) => (
                        { key, label: prop, value: prop }
                      ))
                    }
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Email Address</span>
                <div className="form__form-group-field">
                  <Field
                    name="email"
                    component="input"
                    type="email"
                    placeholder="Enter Email Address"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Office Phone Number</span>
                <div className="form__form-group-field">
                  <Field
                    name="officePhoneNumber"
                    component="input"
                    type="text"
                    placeholder="Enter Office Phone Number"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Contact Person Name</span>
                <div className="form__form-group-field">
                  <Field
                    name="contactPersonName"
                    component="input"
                    type="text"
                    placeholder="Enter Contact Person Name"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Contact Person Phone Number</span>
                <div className="form__form-group-field">
                  <Field
                    name="contactPersonPhoneNumber"
                    component="input"
                    type="text"
                    placeholder="Enter Contact Person Phone Number"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Address</span>
                <div className="form__form-group-field">
                  <Field
                    name="address"
                    component="textarea"
                    type="text"
                    placeholder="Enter Address"
                  />
                </div>
              </div>
              {/* <div className="form__form-group">
                <span className="form__form-group-label">Joined Date</span>
                <div className="form__form-group-field">
                  <DatePicker
                    selected={this.state.date}
                    onChange={this.handleChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="time"
                  />
                </div>
              </div> */}
              {/* <FieldArray name="contracts" component={renderItems} /> */}
              {/* {
                this.state.startDate && <StartDatePicker initialValues={{ startDate: this.state.startDate }} />
              }
              {
                this.state.expiredDate ?
                  <ExpiredDatePicker initialValues={{ expiredDate: this.state.expiredDate }} />
                :
                  <ExpiredDatePicker />
              } */}
              {initialValues.logo ?
                <div className="form__form-group">
                  <span className="form__form-group-label">Logo</span>
                  <div className="form__form-group-field" style={{ width: 200, height: 200, paddingLeft: 0 }}>
                    <img src={initialValues.logo} alt={initialValues.name} />
                  </div>
                  <Field
                    name="logo"
                    component={renderDropZoneField}
                  />
                </div>
                :
                <Field
                  name="logo"
                  component={renderDropZoneField}
                />
              }
              <div style={{ width: '100%' }}>
                <div style={{ width: '70%', display: 'inline-block' }} name="location" >
                  <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
                    <div>{`Longitude: ${location.lng} Latitude: ${location.lat} Zoom: ${zoom}`}</div>
                  </div>
                  <div ref={this.mapRef} className="absolute top right left bottom" style={{ height: '400px' }} />
                </div>
                <div
                  style={{
                    width: '30%',
                    display: 'inline-block',
                    verticalAlign: 'top',
                    paddingLeft: '15px',
                  }}
                >
                  <br /><h4 style={{ textAlign: 'center' }}>Please Select your organization location</h4>
                  <br />
                  <p>
                    {/* <span className="lnr lnr-map-marker" style={{ fontSize: '30px' }} /> */}
                    <img src={marker_icon} alt="marker icon" style={{ width: '30px', height: '30px' }} />
                    &ensp;This sign shows your selected location.
                  </p>
                  <p>
                    &nbsp;
                    <img src={plus_icon} alt="zoom in icon" style={{ width: '25px', height: '25px', margin: '0 auto' }} />
                    &ensp;&nbsp;Click me to zoom in!
                  </p>
                  <p>
                    <img src={minus_icon} alt="zoom out icon" style={{ width: '30px', height: '30px' }} />
                    &ensp;Click me to zoom out!
                  </p>
                  <p>
                    &nbsp;
                    <img src={location_icon} alt="Location icon" style={{ width: '25px', height: '25px' }} />
                    &ensp;&nbsp;Click me to show your current location!
                  </p>
                  <p>
                    &nbsp;
                    <img src={expand_icon} alt="expand icon" style={{ width: '25px', height: '25px' }} />
                    &ensp;&nbsp;Click me to get full screen mode!
                  </p>
                </div>
              </div>
              <ButtonToolbar className="form__button-toolbar">
                <Button color="primary" type="submit">Submit</Button>
                <Button color="secondary" onClick={() => this.redirectToListingPage()}>
                  Cancel
                </Button>
              </ButtonToolbar>
            </form>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

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
  form: 'edit_organization',
})(EditOrganizationForm));
