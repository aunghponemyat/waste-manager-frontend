import React from 'react';
import PropTypes from 'prop-types';
import './ChangePasswordPage.css';

const ChangePasswordPage = ({ onSubmit, onCancel }) => (
  <div className="change-password-bg">
    <div className="change-password-header">
      <button className="back-btn" onClick={onCancel} aria-label="Back">
        <span className="back-arrow">&#8592;</span>
      </button>
      <span className="change-password-title">Change Password</span>
    </div>
    <div className="change-password-card">
      <form className="change-password-form" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="oldPassword">Old Password</label>
          <input
            id="oldPassword"
            name="currentPassword"
            type="password"
            placeholder="Enter old password"
            autoComplete="current-password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            placeholder="Enter new password"
            autoComplete="new-password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="retypePassword">Retype New Password</label>
          <input
            id="retypePassword"
            name="retypePassword"
            type="password"
            placeholder="Retype new password"
            autoComplete="new-password"
            required
          />
        </div>
        <div className="button-row">
          <button type="submit" className="btn btn-green">
            Change Password
          </button>
          <button type="button" className="btn btn-gray" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
);

ChangePasswordPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

ChangePasswordPage.defaultProps = {
  onCancel: () => window.history.back(),
};

export default ChangePasswordPage;
