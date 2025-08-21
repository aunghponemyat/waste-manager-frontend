/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import './EditUserForm.css';

const EditUserForm = ({ onSubmit }) => {
  // Add the 'return' keyword here!
  return (
    <div className="edit-user-bg">
      <div className="edit-user-card">
        <form className="edit-user-form" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">User Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter User Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter Email Address"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              placeholder="Enter Phone Number"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="organization">Organization</label>
            <input
              id="organization"
              name="organization"
              type="text"
              disabled
              value="Organization Name" // Consider passing this as a prop if it's dynamic
              readOnly
            />
          </div>
          <div className="button-row">
            <button type="submit" className="btn btn-green">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditUserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default EditUserForm;
