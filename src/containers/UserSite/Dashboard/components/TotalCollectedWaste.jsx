import React from 'react';
import { FaRecycle } from 'react-icons/fa';

// eslint-disable-next-line react/prop-types
const TotalCollectedWaste = ({ collectedWaste, className = '' }) => {
  // eslint-disable-next-line react/prop-types
  const total = collectedWaste.map(z => z.quantity).reduce((x, y) => x + y, 0).toFixed(2);

  return (
    <div className={`summary-block enhanced-summary-card ${className}`}>
      <div className="summary-icon">
        <FaRecycle size={28} />
      </div>
      <h4 className="summary-value">{total} Kg</h4>
      <p className="summary-label">Total Collected Waste</p>
    </div>
  );
};

export default TotalCollectedWaste;
