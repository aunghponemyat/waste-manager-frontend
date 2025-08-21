/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import Footer from './Footer';
import '../../../../scss/report/FigureCoverPage.scss';

class FigureCoverPage extends PureComponent {
  render() {
    const {
      sectionTitle, pageTitle, Number, totalPages, currentPage,
    } = this.props;
    return (
      <div className="figure-cover-page">
        <div className="content">
          <div className="figure-page-box">
            <div className="figure-page-box-content">
              <div className="figure-page-title">
                <p id="page-title">{pageTitle}</p>
                <p id="number">{Number}</p>
              </div>
              <h2 id="section-title">{sectionTitle}</h2>
            </div>
            <Footer style={{ width: '100%' }} totalPages={totalPages} currentPage={currentPage} />
          </div>
        </div>
      </div>
    );
  }
}

export default FigureCoverPage;
