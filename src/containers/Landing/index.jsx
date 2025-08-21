/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import { Col, Row, Container } from 'reactstrap';
import scrollToComponent from 'react-scroll-to-component';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './components/Header';
import Technologies from './components/Technologies';
// import Demos from './components/Demos';
// import Features from './components/Features';
import Purchase from './components/Purchase';
import Footer from './components/Footer';
// import Testimonials from './components/Testimonials';
import FeatureRequest from './components/FeatureRequest';
import { changeThemeToDark, changeThemeToLight } from '../../redux/actions/themeActions';
// import { ThemeProps } from '../../shared/prop-types/ReducerProps';

const logo = `${process.env.PUBLIC_URL}/recyglo-logo.png`;

class Landing extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    // theme: ThemeProps.isRequired,
  };

  changeToDark = () => {
    const { dispatch } = this.props;
    dispatch(changeThemeToDark());
  };

  changeToLight = () => {
    const { dispatch } = this.props;
    dispatch(changeThemeToLight());
  };

  render() {
    // const { theme } = this.props;

    return (
      <div className="landing">
        <div className="landing__menu">
          <Container>
            <Row>
              <Col md={12}>
                <div className="landing__menu-wrap">
                  <p className="landing__menu-logo" style={{ width: '100px' }}>
                    <img src={logo} alt="" width="100" height="100" />
                  </p>
                  <nav className="landing__menu-nav">
                    <button
                      onClick={() => scrollToComponent(this.About, { offset: -50, align: 'top', duration: 1000 })}
                      type="button"
                    >
                      About RecyGlo
                    </button>
                    <button
                      onClick={() => scrollToComponent(this.Features, {
                        offset: -50,
                        align: 'top',
                        duration: 1500,
                      })}
                      type="button"
                    >
                      Learning &amp; Activities
                    </button>
                    <button
                      onClick={() => scrollToComponent(this.FeatureRequest, {
                        offset: -50,
                        align: 'top',
                        duration: 2500,
                      })}
                      type="button"
                    >
                      Recycling Bins <span className="landing__menu-nav-new" />
                    </button>
                    <a
                      className="landing__btn"
                      rel="noopener noreferrer"
                      href="/login"
                    >
                      Login
                    </a>
                  </nav>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Header onClick={() => scrollToComponent(this.Demos, { offset: -50, align: 'top', duration: 2000 })} />
        <span ref={(section) => {
          this.About = section;
        }}
        />
        <Technologies />
        {/* <span ref={(section) => {
          this.Features = section;
        }}
        />
        <Features /> */}
        {/* <span ref={(section) => {
          this.Demos = section;
        }}
        /> */}
        {/* <Demos theme={theme} changeToDark={this.changeToDark} changeToLight={this.changeToLight} /> */}
        <span ref={(section) => {
          this.FeatureRequest = section;
        }}
        />
        <FeatureRequest />
        {/* <Testimonials /> */}
        <Purchase />
        <Footer />
      </div>
    );
  }
}

export default connect(state => ({ theme: state.theme }))(Landing);
