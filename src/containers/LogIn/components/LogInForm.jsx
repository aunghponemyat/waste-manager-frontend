import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import EyeIcon from 'mdi-react/EyeIcon';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './LogInForm.css';

class LogInForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      showPassword: false,
    };
  }

  showPassword = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }));
  };

  render() {
    const { handleSubmit } = this.props;
    const { showPassword } = this.state;

    return (
      <div className="login-page">
        <div className="login-container">
          <div className="login-card">
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="logo-placeholder">
                <img src="/recyglo_logo.png" alt="RecyGlo Logo" />
              </div>

              <h1 className="title">Welcome To RecyGlo</h1>
              <p className="subtitle">Making The World a Cleaner Place</p>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <Field
                  id="email"
                  name="email"
                  component="input"
                  type="text"
                  placeholder="Email"
                  className="form-input"
                />
              </div>

              <div className="form-group password-group">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="password-input-wrapper">
                  <Field
                    id="password"
                    name="password"
                    component="input"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="form-input"
                  />
                  <button
                    className={`password-toggle${showPassword ? ' active' : ''}`}
                    onClick={this.showPassword}
                    aria-label="Toggle password visibility"
                  >
                    <EyeIcon />
                    <span className="toggle-text">{showPassword ? 'Hide' : 'Show'}</span>
                  </button>
                </div>
              </div>

              <div className="forgot-password">
                <Link to="/forgot-password">
                  <label htmlFor="forgot">Forgot Password?</label>
                </Link>
              </div>

              <Button
                type="submit"
                className="sign-in-btn"
                // disabled
              >
                Sign In
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'log_in_form',
})(LogInForm);
