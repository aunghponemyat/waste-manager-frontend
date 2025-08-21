import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';

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
        <SidebarLink icon="apartment" title="Organizations" route="/organizations" onClick={this.hideSidebar} />
        <SidebarLink icon="users" title="Users" route="/users" onClick={this.hideSidebar} />
        <ul className="sidebar__block">
          <SidebarCategory title="Schedule" icon="calendar-full">
            <SidebarLink title="Way schedules" route="/schedule/waste-collection" onClick={this.hideSidebar} />
            <SidebarLink title="Trainings" route="/schedule/trainings" onClick={this.hideSidebar} />
          </SidebarCategory>
        </ul>
        <ul className="sidebar__block">
          <SidebarCategory title="Bins" icon="trash">
            <SidebarLink title="Bin Orders" route="/bin/orders" onClick={this.hideSidebar} />
            <SidebarLink title="Available Bins" route="/bin/available-bins" onClick={this.hideSidebar} />
          </SidebarCategory>
        </ul>
        <ul className="sidebar__block">
          <SidebarLink icon="users" title="Reporting" route="/reporting" onClick={this.hideSidebar} />
        </ul>
      </div>
    );
  }
}

export default SidebarContent;
