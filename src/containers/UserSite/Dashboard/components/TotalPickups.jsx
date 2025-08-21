import React from "react";
import { FaTruckPickup } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const TotalWays = ({ ways, className = '' }) => (
  <div className={`summary-block enhanced-summary-card ${className}`}>
    <div className="summary-icon">
      <FaTruckPickup size={28} />
    </div>
    <h4 className="summary-value">{ways}</h4>
    <p className="summary-label">Total Pickups</p>
  </div>
);

export default TotalWays;
