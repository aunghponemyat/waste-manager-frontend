/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
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
import SingleTrendline from './components/SingleTrendline';
import Composition from './components/Composition';
import TotalComposition from './components/TotalComposition';
import PaperRecycling from './components/PaperRecycling';
import PlasticRecycling from './components/PlasticRecycling';
import CanRecycling from './components/CanRecycling';
import GlassRecycling from './components/GlassRecycling';
import OrganicRecycling from './components/OrganicRecycling';

class Reporting extends PureComponent {
  state= {
    data: null,
    totalPages: 0,
    months: 0,
    dates: null,
    TrendLineDataList: null,
    background: null,
    maxWays: 0,
    trendLineLength: 0,
  }

  componentWillMount() {
    const { reportId } = this.props.match.params;
    let { totalPages } = this.state;
    getReportDetail(reportId)
      .then((response) => {
        const link = response.data.data;
        const encryptedData = link.replace(/SLASH/gi, '/');
        const bytes = CryptoJS.AES.decrypt(encryptedData, 'secret key 123');
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        console.log(decryptedData);
        if (decryptedData.background) {
          this.setState({
            background: decryptedData.background,
          });
        }
        const months = [];
        const dates = [];
        for (const key in decryptedData.data) {
          for (let i = 0; i < decryptedData.data[key].length; i += 1) {
            if (!months.includes(new Date(decryptedData.data[key][i].pickUpTime).getMonth())) {
              months.push(new Date(decryptedData.data[key][i].pickUpTime).getMonth());
            }
            if (!dates.includes(new Date(decryptedData.data[key][i].pickUpTime))) {
              dates.push(new Date(decryptedData.data[key][i].pickUpTime));
            }
          }
        }
        let tmpDict = {};
        const TrendLineDataList = [];
        let maxWays = 0;
        for (let i = 0; i < Object.keys(decryptedData.trendLineData).length; i += 1) {
          const key = Object.keys(decryptedData.trendLineData)[i];
          tmpDict[key] = decryptedData.trendLineData[key];
          if ((i + 1 + (4 * TrendLineDataList.length)) === ((TrendLineDataList.length + 1) * 4) || Object.keys(decryptedData.trendLineData).length === (i + 1)) {
            // eslint-disable-next-line no-loop-func
            maxWays = Object.keys(tmpDict).map(item => (tmpDict[item].length > maxWays ? tmpDict[item].length : maxWays));
            maxWays = Math.max(...maxWays);
            TrendLineDataList.push(tmpDict);
            tmpDict = {};
          }
        }
        let trendLineLength = 0;
        if (maxWays > 10) {
          trendLineLength = Object.keys(decryptedData.trendLineData).length;
        } else {
          trendLineLength = Object.keys(TrendLineDataList).length;
        }
        totalPages = 15 + trendLineLength + (2 * Object.keys(decryptedData.data).length);
        this.setState({
          data: decryptedData,
          totalPages,
          months,
          dates,
          TrendLineDataList,
          maxWays,
          trendLineLength,
        });
      });
  }

  render() {
    const {
      data, totalPages, months, dates, TrendLineDataList, background, maxWays, trendLineLength,
    } = this.state;
    return (
      <div className="landing">
        {data && months && dates &&
          <div>
            <CoverPage
              organization={data.organization}
              reportTitle={data.reportTitle}
              date={data.reportDate}
              background={background}
            />
            <Intro
              organization={data.organization}
              address1={data.address1}
              address2={data.address2}
              address3={data.address3}
              date={data.reportDate}
              totalPages={totalPages}
              contractDate={data.contractDate}
              dates={dates}
            />
            <Summary
              organization={data.organization}
              auditStartDate={data.auditStartDate}
              findings={data.findings}
              recommendations={data.recommendations}
              totalPages={totalPages}
              months={months.length}
              date={data.reportDate}
            />
            <FigureCoverPage
              sectionTitle="Monthly Waste Audit Results"
              pageTitle="Figures and Data"
              Number="1"
              totalPages={totalPages}
              currentPage={4}
            />
            {data.data &&
              Object.keys(data.data).map((item, i) => (
                <Generation
                  organization={data.organization}
                  data={data.data[item]}
                  title={item}
                  totalPages={totalPages}
                  currentPage={5 + i}
                  date={data.reportDate}
                />
              ))
            }
            <FigureCoverPage
              sectionTitle="Common Items Found in Waste Audit"
              pageTitle="Figures and Data"
              Number="2"
              totalPages={totalPages}
              currentPage={5 + Object.keys(data.data).length}
            />
            <ItemsFound data={data.data} totalPages={totalPages} currentPage={6 + Object.keys(data.data).length} reportDate={data.reportDate} />
            <FigureCoverPage
              sectionTitle="Waste Recycling Trend Line"
              pageTitle="Figures and Data"
              Number="3"
              totalPages={totalPages}
              currentPage={7 + Object.keys(data.data).length}
            />
            {maxWays > 10 ?
              data &&
                Object.keys(data.trendLineData).map((item, i) => (
                  <SingleTrendline waste={item} organization={data.organization} data={data.trendLineData[item]} quarters={Object.keys(data.data)} totalPages={totalPages} currentPage={8 + i + Object.keys(data.data).length} reportDate={data.reportDate} />
                ))
              :
              TrendLineDataList &&
                TrendLineDataList.map((item, i) => (
                  <Trendline organization={data.organization} data={item} quarters={Object.keys(data.data)} totalPages={totalPages} currentPage={8 + i + Object.keys(data.data).length} reportDate={data.reportDate} />
                ))
            }
            <FigureCoverPage sectionTitle="Waste Composition in Percentage" pageTitle="Figures and Data" Number="4" totalPages={totalPages} currentPage={8 + trendLineLength + Object.keys(data.data).length} />
            {data.data &&
              Object.keys(data.data).map((item, i) => (
                <Composition data={data.data[item]} title={item} totalPages={totalPages} currentPage={9 + trendLineLength + Object.keys(data.data).length + i} reportDate={data.reportDate} />
              ))
            }
            <TotalComposition months={months} organization={data.organization} data={data.totalComposition} quarters={Object.keys(data.data)} totalPages={totalPages} currentPage={9 + trendLineLength + (2 * Object.keys(data.data).length)} reportDate={data.reportDate} />
            <FigureCoverPage sectionTitle="Paper, Plastic, Cans and Glass Waste Recycling" pageTitle="What Happened To Your Waste?" Number="5" totalPages={totalPages} currentPage={10 + trendLineLength + (2 * Object.keys(data.data).length)} />
            <PaperRecycling totalPages={totalPages} currentPage={11 + trendLineLength + (2 * Object.keys(data.data).length)} reportDate={data.reportDate} />
            <PlasticRecycling totalPages={totalPages} currentPage={12 + trendLineLength + (2 * Object.keys(data.data).length)} reportDate={data.reportDate} />
            <CanRecycling totalPages={totalPages} currentPage={13 + trendLineLength + (2 * Object.keys(data.data).length)} reportDate={data.reportDate} />
            <GlassRecycling totalPages={totalPages} currentPage={14 + trendLineLength + (2 * Object.keys(data.data).length)} reportDate={data.reportDate} />
            <OrganicRecycling totalPages={totalPages} currentPage={15 + trendLineLength + (2 * Object.keys(data.data).length)} reportDate={data.reportDate} />
          </div>
        }
      </div>
    );
  }
}

export default Reporting;
