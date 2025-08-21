import React, { PureComponent } from 'react';
import DownIcon from 'mdi-react/ChevronDownIcon';
import { Collapse } from 'reactstrap';
// import TopbarMenuLink from './TopbarMenuLink';
import TopbarMenuBtn from './TopbarMenuBtn';
import LogoutBtn from './LogoutBtn';

const Ava = `${process.env.PUBLIC_URL}/img/ava.png`;

export default class TopbarProfile extends PureComponent {
  constructor() {
    super();
    this.state = {
      collapse: false,
      name: '',
      logo: null,
    };
  }

  componentWillMount() {
    this.setState({
      name: JSON.parse(localStorage.getItem('user')).name,
      logo: JSON.parse(localStorage.getItem('user')).organizationId.logo,
    });
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  render() {
    return (
      <div className="topbar__profile">
        <button className="topbar__avatar" onClick={this.toggle}>
          {this.state.logo ?
            <img className="topbar__avatar-img" src={this.state.logo} alt="avatar" /> :
            <img className="topbar__avatar-img" src={Ava} alt="avatar" />
          }
          <p className="topbar__avatar-name">{this.state.name}</p>
          <DownIcon className="topbar__icon" />
        </button>
        {this.state.collapse && <button className="topbar__back" onClick={this.toggle} />}
        <Collapse isOpen={this.state.collapse} className="topbar__menu-wrap">
          <div className="topbar__menu">
            <TopbarMenuBtn title="Account" icon="user" link="/profile" />
            <TopbarMenuBtn title="Organization" icon="apartment" link="/organization" />
            {/* <TopbarMenuBtn title="Invoice" icon="file-empty" link="/invoice" /> */}
            <div className="topbar__menu-divider" />
            <TopbarMenuBtn title="Change Password" icon="pencil" link="/change_password" />
            <LogoutBtn title="Log Out" icon="exit" path="/" />
          </div>
        </Collapse>
      </div>
    );
  }
}
