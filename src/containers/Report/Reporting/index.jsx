/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import CryptoJS from 'crypto-js';
import CoverPage from './components/CoverPage';
import Intro from './components/Intro';
import Summary from './components/Summary';
import FigureCoverPage from './components/FigureCoverPage';
import Generation from './components/Generation';
import ItemsFound from './components/ItemsFound';
import Trendline from './components/Trendline';
import Composition from './components/Composition';
import TotalComposition from './components/TotalComposition';

class Reporting extends PureComponent {
  state= {
    data: null,
  }

  componentWillMount() {
    const { link } = this.props.match.params;
    const encryptedData = link.replace(/SLASH/gi, '/');
    const bytes = CryptoJS.AES.decrypt(encryptedData, 'secret key 123');
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log(decryptedData.trendLineData);

    const trendLineListData = [];
    for (let i = 0; i < decryptedData.trendlineData.length; i += 1) {
      console.log(trendLineListData[trendLineListData.length - 1]);
      if (trendLineListData[trendLineListData.length - 1].length < 4) {
        trendLineListData.push(decryptedData.trendlineData[i]);
      }
    }
    console.log(trendLineListData);

    this.setState({
      data: decryptedData,
    });
  }

  render() {
    const { data } = this.state;
    // console.log(data);
    return (
      <div className="landing">
        {data &&
          <div>
            <CoverPage
              organization={data.organization}
              reportTitle={data.reportTitle}
              date={data.reportDate}
            />
            <Intro
              organization={data.organization}
              address1={data.address1}
              address2={data.address2}
              address3={data.address3}
              date={data.reportDate}
            />
            <Summary
              auditStartDate={data.auditStartDate}
              findings={data.findings}
              recommendations={data.recommendations}
            />
            <FigureCoverPage sectionTitle="Monthly Waste Audit Results" pageTitle="Figures and Data" Number="1" />
            {/* <Generation data={data} /> */}
            {data.data &&
              Object.keys(data.data).map(item => (
                <Generation data={data.data[item]} title={item} />
              ))
            }
            <FigureCoverPage sectionTitle="Common Items Found in Waste Audit" pageTitle="Figures and Data" Number="2" />
            <ItemsFound />
            <FigureCoverPage sectionTitle="Waste Recycling Trend Line" pageTitle="Figures and Data" Number="3" />
            {

            }
            <Trendline data={data.trendLineData} />
            <FigureCoverPage sectionTitle="Waste Composition in Percentage" pageTitle="Figures and Data" Number="4" />
            {/* <Generation data={data} /> */}
            {data.data &&
              Object.keys(data.data).map(item => (
                <Composition data={data.data[item]} title={item} />
              ))
            }
            {/* <Composition /> */}
            <TotalComposition data={data.totalComposition} />
          </div>
        }
      </div>
    );
  }
}

export default Reporting;
