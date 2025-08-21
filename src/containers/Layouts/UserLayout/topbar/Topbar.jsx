/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { PureComponent } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TopbarSidebarButton from './TopbarSidebarButton';
import TopbarProfile from './TopbarProfile';

class Topbar extends PureComponent {
  static propTypes = {
    changeMobileSidebarVisibility: PropTypes.func.isRequired,
    changeSidebarVisibility: PropTypes.func.isRequired,
  };

  render() {
    const { changeMobileSidebarVisibility, changeSidebarVisibility } = this.props;

    return (
      <div className="topbar">
        <div className="topbar__wrapper">
          <div className="topbar__left">
            <TopbarSidebarButton
              changeMobileSidebarVisibility={changeMobileSidebarVisibility}
              changeSidebarVisibility={changeSidebarVisibility}
            />
            <a className="topbar__logo" href="https://www.recyglo.com" target="_blank" />
            <h4 className="topbar__company_name">RecyGlo</h4>
            {/* <p style={{ margin: '25px auto auto 0', color: 'teal' }}>beta</p> */}
          </div>
          <div className="topbar__right">
            <TopbarProfile />
          </div>
        </div>
      </div>
    );
  }
}

export default Topbar;
