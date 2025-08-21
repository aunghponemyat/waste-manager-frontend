import React from 'react';
import CarbonReport from './Components/CarbonReport';
import about from '../../../assets/images/about.png'; // ✅ Updated path
import './Organizations.css';

const Organizations = () => (
  <div className="report-wrapper">
    <div className="report-document">

      {/* Banner Image */}
      <div className="report-banner">
        <img
          src={about}
          alt="Carbon Emission Cover"
          className="banner-img"
          onError={(e) => { e.target.style.display = 'none'; }} // ✅ Hide if not found
        />
        <div className="banner-text">Carbon Emission Report</div>
      </div>

      {/* Executive Summary */}
      <section>
        <h3 className="section-title green">Executive Summary</h3>
        <p>
          <strong>Recyglo</strong>, a leading waste management platform, is dedicated to
          revolutionizing the waste management landscape by providing sustainable and
          efficient solutions. As part of its commitment to environmental sustainability,
          <strong> Recyglo</strong> has initiated a comprehensive assessment of the
          greenhouse gas (GHG) emissions associated with its waste management services.
          The primary purpose of this GHG emission report is to quantify the GHG savings
          achieved by recycling and composting waste through <strong>Recyglo’s</strong> platform
          over a specified period.
        </p>
        <p>
          By utilizing the Environmental Protection Agency (EPA) GHG simulation provided
          by the Institute for Global Environmental Strategies (IGES), <strong>Recyglo</strong> aims
          to provide transparent and actionable insights into its environmental impact.
        </p>
        <div className="iframe-container">
          <iframe
            src="https://ourworldindata.org/grapher/annual-co2-emissions-per-country?country=~OWID_WRL"
            width="80%"
            height="500px"
            frameBorder="0"
            title="CO2 Emissions Chart"
          />
        </div>
      </section>
      <hr />

      {/* Methodologies */}
      <section>
        <h3 className="section-title green">Methodologies</h3>
        <p>The GHG emission assessment within this report is conducted using the following methodologies:</p>
        <ul>
          <li>
            <strong>EPA GHG Simulation</strong>: Calculates direct emissions from various stages
            of waste recycling.
          </li>
          <li><strong>IGES’s Emission Factor Simulator</strong>: Uses global simulation data to estimate emissions.</li>
          <li><strong>Direct Emission Calculation</strong>: Measures GHG emissions from the recycling process.</li>
          <li>
            <strong>Emission Savings Calculation</strong>: Computes savings from diverting waste from
            landfilling.
          </li>
        </ul>
        <div className="iframe-container">
          <iframe
            src="https://ourworldindata.org/grapher/co-emissions-per-capita"
            width="80%"
            height="500px"
            frameBorder="0"
            title="CO2 Emissions Per Capita"
          />
        </div>
      </section>
      <hr />

      {/* Key Insights */}
      <section>
        <h3 className="section-title green">Key Insights</h3>
        <p>
          This GHG emission report not only measures the environmental impact of waste
          management but also highlights the importance of recycling and composting in
          reducing emissions.
        </p>
        <p>
          <strong>GHG Emission Reduction Measurement</strong>: Calculates emissions from
          transportation, processing, and disposal, and estimates savings through
          recycling.
        </p>
        <p>
          <strong>Net GHG Emissions</strong>: Derived by subtracting the saved emissions
          from the total emissions — giving a clear, net figure for Recyglo operations.
        </p>
        <div className="iframe-container">
          <iframe
            src="https://ourworldindata.org/grapher/annual-co-emissions-by-region"
            width="80%"
            height="500px"
            frameBorder="0"
            title="CO2 Emissions by Region"
          />
        </div>
      </section>
      <hr />

      {/* Disclaimer */}
      <section>
        <h3 className="section-title green">Disclaimer</h3>
        <ul>
          <li>(A) GHG emissions from recycling</li>
          <li>(B) Avoided GHG emissions from virgin material production</li>
          <li>(C) Avoided GHG emissions from landfilling</li>
          <li>(D) Net GHG emissions = A - B - C</li>
        </ul>
      </section>
      <hr />

      {/* Add-on Report */}
      <section style={{ marginTop: '2rem', width: '100%' }}>
        <CarbonReport />
      </section>
    </div>
  </div>
);

export default Organizations;
