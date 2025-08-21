/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TopbarMenuBtn from './TopbarMenuBtn';
import { logOut } from '../../../../redux/actions/apiActions/AuthActions';
import './TopbarProfile.css';

class TopbarMenuLinks extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  render() {
    const { dispatch } = this.props;

    return (
      <div>
        <TopbarMenuBtn title="Change Password" icon="pencil" link="/change_password" className="topbar__menu-btn" />
        <button
          className="topbar__menu-btn"
          onClick={() => dispatch(logOut())}
          type="button"
        >
          <span className="topbar__link-icon lnr lnr-exit" />
          <p className="topbar__link-title">Log Out</p>
        </button>
      </div>
    );
  }
}

export default connect()(TopbarMenuLinks);
