/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../../../../scss/report/Summary.scss';

class Summary extends PureComponent {
  render() {
    const {
      auditStartDate, findings, recommendations, totalPages, months, organization, date,
    } = this.props;
    return (
      <div className="summary-page">
        <Header date={date} />
        <div className="summary-content">
          <div className="summary-title">
            <h4>Dashboard</h4>
            <h4>Executive Summary</h4>
          </div>
          <div className="summary-box">
            <h5>Purpose</h5>
            <p style={{ fontSize: '14px', textAlign: 'justify' }}>The purpose of the waste management report was to identify, quantify and analyze the composition of the waste stream generated from {organization} to ensure compliance with the requirements suggested by the ISO 14001-2015 and by YCDC.</p>
          </div>
          <div className="summary-box">
            <h5>Audit Methodology</h5>
            <p style={{ fontSize: '14px', textAlign: 'justify' }}>To collect an appropriate sample of waste for the audit, segregated waste were collected from the bins at designated areas of {organization} for several months, which were predetermined and served to analyze the total amount of waste, the employees&apos; behavior, and improve {organization}&apos;s best practices for waste management.</p>
          </div>
          <div className="summary-box">
            <h5>Waste Audit Reslut</h5>
            <p style={{ fontSize: '14px', textAlign: 'justify' }}>The information contained in this report was gathered from the on-site collection by RecyGlo. Waste audit is an analysis of the current waste management such as waste segregation, waste generation and waste recycling used at {organization}. The waste audit of {organization} has been continuously performed for {months} months, starting from {auditStartDate}. The figures in the next pages display the weight and percentage of each type of collected waste and also the total amount of all the categories which were analyzed in the audit.</p>
          </div>
          {findings &&
            <div className="summary-box">
              <h5>Summary of Findings</h5>
              <ul>
                {findings.map(finding => (
                  <li style={{ fontSize: '14px', textAlign: 'justify' }}>{finding}</li>
                ))}
              </ul>
            </div>
          }
          {recommendations &&
            <div className="summary-box">
              <h5>Recommendations</h5>
              <ul>
                {recommendations.map(recommendation => (
                  <li style={{ fontSize: '14px', textAlign: 'justify' }}>{recommendation}</li>
                ))}
              </ul>
            </div>
          }
        </div>
        <Footer totalPages={totalPages} currentPage={3} />
      </div>
    );
  }
}

export default Summary;
