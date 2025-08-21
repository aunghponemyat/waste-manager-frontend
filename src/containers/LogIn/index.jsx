import React from 'react';
import { connect } from 'react-redux';
import LogInForm from './components/LogInForm';
import { login } from '../../redux/actions/apiActions/AuthActions';
import './components/LogInForm.css';
import LanguageBar from '../../shared/components/Languages';

// eslint-disable-next-line react/prop-types
const LogIn = ({ dispatch }) => (
  <div className="login-root">
    <div className="login-left" />
    <div className="login-right">
      <LanguageBar />
      <LogInForm onSubmit={values => dispatch(login(values))} />
    </div>
  </div>
);

export default connect()(LogIn);
