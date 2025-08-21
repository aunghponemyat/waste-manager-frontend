import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';
// import SidebarCategory from './SidebarCategory';

class SidebarContent extends Component {
  static propTypes = {
    // changeToDark: PropTypes.func.isRequired,
    // changeToLight: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  hideSidebar = () => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.onClick();
  };

  render() {
    return (
      <div className="sidebar__content">
        <SidebarLink
          title="Dashboard"
          icon="home"
          route="/"
          onClick={this.hideSidebar}
        />
        <SidebarLink icon="calendar-full" title="Schedule" route="/schedule" onClick={this.hideSidebar} />
        <SidebarLink icon="database" title="Data Table" route="/data_table" onClick={this.hideSidebar} />
        <SidebarLink icon="graduation-hat" title="Training" route="/training" onClick={this.hideSidebar} />
        <SidebarLink icon="book" title="Waste Report" route="/reporting" onClick={this.hideSidebar} />
        <SidebarLink icon="book" title="Carbon Report" route="/carbon_report" onClick={this.hideSidebar} />
        <SidebarLink
          title="Contact"
          icon="phone"
          route="/contact"
          onClick={this.hideSidebar}
        />
        <SidebarLink
          title="Terms & conditions"
          icon="license"
          route="/terms_and_conditions"
          onClick={this.hideSidebar}
        />
        {/* <SidebarLink
          icon="pencil"
          title="On Demand Request"
          route="/on_demand_request"
          onClick={this.hideSidebar}
        /> */}
        {/* <ul className="sidebar__block">
          <SidebarCategory title="Example Pages" icon="diamond">
          </SidebarCategory>
        </ul> */}
      </div>
    );
  }
}

export default SidebarContent;
