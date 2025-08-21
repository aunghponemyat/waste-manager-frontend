/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable object-curly-newline */
import React, { PureComponent } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
// import DatePicker from 'react-datepicker';
import '../../../../../scss/component/date-time-picker.scss';
import { CHANGE_LOCATION } from '../../../../../redux/actions/apiActions/ActionTypes';

mapboxgl.accessToken = 'pk.eyJ1IjoicmVpbmVyLWl6LWRhYmVzdCIsImEiOiJjbWQycHZ1MnAxMG9nMmxxcGttMG0wNmZ0In0.1jd7h3E4dGlDofAXOEgBFQ';

class Location extends PureComponent {
  static propTypes = {
    changeLocation: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      lng: 96.195129,
      lat: 16.866070,
      zoom: 12,
      location: null,
      updated: false,
    };
  }

  componentWillMount() {
    // this.setState({
    //   location: this.props.organizations.location,
    // });
    console.log(this.props.organizations);
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom,
    });

    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
  }
  mapRef = React.createRef();
  handleChange = (location) => {
    this.setState({ location, updated: true });
    this.props.changeLocation(location.toISOString());
  }

  render() {
    const { lng, lat, zoom, location, updated } = this.state;
    return (
      <div>
        {console.log(location)}
        {console.log(updated)}
        <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div onChange={this.handleChange}>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        <div ref={this.mapRef} className="absolute top right left bottom" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: { location: state.organizations.location },
});

const mapDispatchToProps = dispatch => ({
  changeLocation: location => dispatch({
    type: CHANGE_LOCATION,
    payload: location,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'editOrganizationLocation',
  enableReinitialize: true,
})(Location));
