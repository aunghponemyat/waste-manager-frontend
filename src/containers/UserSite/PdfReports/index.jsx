/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */

import React, { PureComponent } from 'react';
import CryptoJS from 'crypto-js';
import { getReportDetail } from '../../../redux/actions/apiActions/ReportsActions';
import CoverPage from './components/CoverPage';
import Intro from './components/Intro';
import Summary from './components/Summary';
import FigureCoverPage from './components/FigureCoverPage';
import Generation from './components/Generation';
import ItemsFound from './components/ItemsFound';
import Trendline from './components/Trendline';
// import SingleTrendline from './components/SingleTrendline';
import Composition from './components/Composition';
import TotalComposition from './components/TotalComposition';
import PaperRecycling from './components/PaperRecycling';
import PlasticRecycling from './components/PlasticRecycling';
import CanRecycling from './components/CanRecycling';
import GlassRecycling from './components/GlassRecycling';
import OrganicRecycling from './components/OrganicRecycling';

class Reporting extends PureComponent {
  state= {
    decryptedData: {},
    totalPages: 18,
    trendLineListData: null,
  }

  componentWillMount() {
    const { reportId } = this.props.match.params;
    getReportDetail(reportId)
      .then((response) => {
        const link = response.data.data;
        const encryptedData = link.replace(/SLASH/gi, '/');
        const bytes = CryptoJS.AES.decrypt(encryptedData, 'secret key 123');
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        const trendLineListData = [{}];
        for (const key in decryptedData.trendlineData) {
          if (Object.keys(trendLineListData[trendLineListData.length - 1]).length < 4) {
            trendLineListData[trendLineListData.length - 1][key] = decryptedData.trendlineData[key];
          } else {
            trendLineListData.push({});
            trendLineListData[trendLineListData.length - 1][key] = decryptedData.trendlineData[key];
          }
        }
        let { totalPages } = this.state;
        totalPages += trendLineListData.length - 1;
        this.setState({
          decryptedData,
          trendLineListData,
          totalPages,
        });
      });
  }

  render() {
    const {
      data,
      organization,
      reportTitle,
      reportDate,
      auditStartDate,
      generationData,
      // trendlineData,
      totalCompositionData,
      findings,
      recommendations,
      minMonth,
      maxMonth,
    } = this.state.decryptedData;
    console.log(this.state.decryptedData);
    const { totalPages, trendLineListData } = this.state;
    return (
      <div className="landing">
        {organization && data &&
          <div>
            <CoverPage
              organization={organization.name}
              reportTitle={reportTitle}
              date={new Date(reportDate).toLocaleDateString()}
            />
            <Intro
              organization={organization.name}
              address1={organization.address}
              // address2={data.address2}
              // address3={data.address3}
              date={new Date(reportDate).toLocaleDateString()}
              totalPages={totalPages}
              contractDate={new Date(auditStartDate)}
              // dates={dates}
              minMonth={minMonth}
              maxMonth={maxMonth}
            />
            <Summary
              organization={organization.name}
              auditStartDate={new Date(auditStartDate).toLocaleDateString()}
              findings={findings}
              recommendations={recommendations}
              totalPages={totalPages}
              months={Object.keys(generationData).length}
              date={new Date(reportDate).toLocaleDateString()}
            />
            <FigureCoverPage
              sectionTitle="Monthly Waste Audit Results"
              pageTitle="Figures and Data"
              Number="1"
              totalPages={totalPages}
              currentPage={4}
            />
            {generationData &&
              Object.keys(generationData).map(key => (
                <Generation
                  organization={organization.name}
                  data={generationData[key]}
                  title={key}
                  totalPages={totalPages}
                  currentPage={5}
                  date={new Date(reportDate).toLocaleDateString()}
                />
              ))
            }
            <FigureCoverPage
              sectionTitle="Common Items Found in Waste Audit"
              pageTitle="Figures and Data"
              Number="2"
              totalPages={totalPages}
              currentPage={6}
            />
            <ItemsFound data={data} totalPages={totalPages} currentPage={7} reportDate={new Date(reportDate).toLocaleDateString()} />
            <FigureCoverPage
              sectionTitle="Waste Recycling Trend Line"
              pageTitle="Figures and Data"
              Number="3"
              totalPages={totalPages}
              currentPage={8}
            />
            {trendLineListData &&
              trendLineListData.map((item, key) => (
                <Trendline organization={organization.name} data={item} months={Object.keys(data.ways)} totalPages={totalPages} currentPage={9 + key} reportDate={new Date(reportDate).toLocaleDateString()} />
              ))
            }
            <FigureCoverPage sectionTitle="Waste Composition in Percentage" pageTitle="Figures and Data" Number="4" totalPages={totalPages} currentPage={10 + (trendLineListData.length - 1)} />
            {generationData &&
              Object.keys(generationData).map(key =>
                <Composition data={generationData[key]} title={key} totalPages={totalPages} currentPage={11 + (trendLineListData.length - 1)} reportDate={new Date(reportDate).toLocaleDateString()} />)
            }
            <TotalComposition months={Object.keys(data.ways)} organization={organization.name} data={totalCompositionData} quarter={Object.keys(data.ways)} totalPages={totalPages} currentPage={12 + (trendLineListData.length - 1)} reportDate={new Date(reportDate).toLocaleDateString()} />
            <FigureCoverPage sectionTitle="Paper, Plastic, Cans and Glass Waste Recycling" pageTitle="What Happened To Your Waste?" Number="5" totalPages={totalPages} currentPage={13 + (trendLineListData.length - 1)} />
            <PaperRecycling totalPages={totalPages} currentPage={14 + (trendLineListData.length - 1)} reportDate={new Date(reportDate).toLocaleDateString()} />
            <PlasticRecycling totalPages={totalPages} currentPage={15 + (trendLineListData.length - 1)} reportDate={new Date(reportDate).toLocaleDateString()} />
            <CanRecycling totalPages={totalPages} currentPage={16 + (trendLineListData.length - 1)} reportDate={new Date(reportDate).toLocaleDateString()} />
            <GlassRecycling totalPages={totalPages} currentPage={17 + (trendLineListData.length - 1)} reportDate={new Date(reportDate).toLocaleDateString()} />
            <OrganicRecycling totalPages={totalPages} currentPage={18 + (trendLineListData.length - 1)} reportDate={new Date(reportDate).toLocaleDateString()} />
          </div>
        }
      </div>
    );
  }
}

export default Reporting;
