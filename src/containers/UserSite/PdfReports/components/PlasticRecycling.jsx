/* eslint-disable react/prop-types */
/* eslint-disable quote-props */
/* eslint-disable no-loop-func */
/* eslint-disable no-return-assign */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
import React, { PureComponent } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../../../../scss/report/ItemsFound.scss";

const plastic1 = `${process.env.PUBLIC_URL}/img/plastic1.jpg`;
const plastic2 = `${process.env.PUBLIC_URL}/img/plastic2.jpg`;
const plastic3 = `${process.env.PUBLIC_URL}/img/plastic3.jpg`;
const plastic4 = `${process.env.PUBLIC_URL}/img/plastic4.jpg`;
const plastic5 = `${process.env.PUBLIC_URL}/img/plastic5.jpg`;
const plastic6 = `${process.env.PUBLIC_URL}/img/plastic6.jpg`;
const plastic7 = `${process.env.PUBLIC_URL}/img/plastic7.jpg`;
const plastic8 = `${process.env.PUBLIC_URL}/img/plastic8.jpg`;
const plastic9 = `${process.env.PUBLIC_URL}/img/plastic9.jpg`;
const plastic10 = `${process.env.PUBLIC_URL}/img/plastic10.jpg`;
// const img4 = `${process.env.PUBLIC_URL}/img/paper4.jpg`;

class PlasticRecycling extends PureComponent {
  render() {
    const { totalPages, currentPage, reportDate } = this.props;
    return (
      <div className="generation-page">
        <Header date={reportDate} />
        <div className="generation-content">
          <div className="generation-title">
            <div style={{ width: "100%", float: "right" }}>
              <p>What Happened to Your Plastic Waste?</p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <table style={{ marginTop: "5px", width: "100%" }}>
              <tr>
                <th
                  style={{
                    textAlign: "center",
                    width: "520px",
                  }}
                >
                  <h3 style={{ backgroundColor: "#aaaaaa" }}>
                    Plastic Recycling
                  </h3>
                </th>
                <th
                  style={{
                    paddingLeft: "5px",
                    paddingRight: "5px",
                    textAlign: "center",
                    width: "350px",
                  }}
                >
                  <h3 style={{ backgroundColor: "#aaaaaa" }}>Raw Material</h3>
                </th>
                <th
                  style={{
                    textAlign: "center",
                  }}
                >
                  <h3 style={{ backgroundColor: "#aaaaaa" }}>Final Product</h3>
                </th>
                {/* <th style={{ textAlign: 'center', backgroundColor: '#aaaaaa' }}><h3>Raw Material</h3></th>
                <th style={{ textAlign: 'center', backgroundColor: '#aaaaaa' }}><h3>Final Product</h3></th> */}
              </tr>
              <tr>
                <td
                  style={{
                    display: "block",
                    // flexDirection: 'row',
                    // padding: '20px',
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    style={{
                      display: "block",
                      width: "500px",
                      margin: "5px auto",
                    }}
                    src={plastic1}
                    alt="image1"
                  />
                  <div
                    style={{ width: "-webkit-fit-content", margin: "5px auto" }}
                  >
                    <img
                      style={{ width: "250px" }}
                      src={plastic2}
                      alt="image2"
                      height="300"
                    />
                    <img
                      style={{ width: "250px" }}
                      src={plastic3}
                      alt="image2"
                      height="300"
                    />
                  </div>
                </td>
                <td style={{}}>
                  <img
                    style={{
                      display: "block",
                      padding: "5px",
                      margin: "0 auto",
                      width: "300px",
                    }}
                    src={plastic4}
                    alt="image1"
                  />
                  <img
                    style={{
                      display: "block",
                      padding: "5px",
                      margin: "0 auto",
                      width: "300px",
                    }}
                    src={plastic5}
                    alt="image1"
                  />
                  <img
                    style={{
                      display: "block",
                      padding: "5px",
                      margin: "0 auto",
                      width: "300px",
                    }}
                    src={plastic6}
                    alt="image1"
                  />
                </td>
                <td style={{}}>
                  <img
                    style={{
                      display: "block",
                      padding: "5px",
                      margin: "0 auto",
                      width: "100px",
                    }}
                    src={plastic7}
                    alt="image1"
                  />
                  <img
                    style={{
                      display: "block",
                      padding: "100px 10px",
                      margin: "0 auto",
                      width: "100px",
                    }}
                    src={plastic8}
                    alt="image1"
                  />
                  {/* <img
                    style={{
                      display: 'block', padding: '5px', margin: '0 auto', width: '100px',
                    }}
                    src={plastic9}
                    alt="image1"
                  /> */}
                  <div
                    style={{ width: "-webkit-fit-content", margin: "5px auto" }}
                  >
                    <img
                      style={{ width: "150px" }}
                      src={plastic9}
                      alt="image2"
                    />
                    <img
                      style={{ width: "150px" }}
                      src={plastic10}
                      alt="image2"
                    />
                  </div>
                </td>
                {/* <td style={{
                  // display: 'flex',
                  // flexDirection: 'column',
                  padding: '30px',
                  }}
                >
                  <img style={{ width: '300px', display: 'block', margin: '0 auto' }} src={img4} alt="image4" />
                </td> */}
              </tr>
            </table>
            <p style={{ color: "#00b0f0", marginLeft: "30px" }}>
              * This are just the sample image of the product. The design and
              type of the product can be changed accordingly.
            </p>
          </div>
        </div>
        <Footer totalPages={totalPages} currentPage={currentPage} />
      </div>
    );
  }
}

export default PlasticRecycling;
