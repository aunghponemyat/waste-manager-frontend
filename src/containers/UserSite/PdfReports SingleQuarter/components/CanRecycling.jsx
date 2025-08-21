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

const can1 = `${process.env.PUBLIC_URL}/img/can1.jpg`;
const can2 = `${process.env.PUBLIC_URL}/img/can2.jpg`;
const can3 = `${process.env.PUBLIC_URL}/img/can3.jpg`;
const can4 = `${process.env.PUBLIC_URL}/img/can4.jpg`;

class CanRecycling extends PureComponent {
  render() {
    const { totalPages, currentPage, reportDate } = this.props;
    return (
      <div className="generation-page">
        <Header date={reportDate} />
        <div className="generation-content">
          <div className="generation-title">
            <div style={{ width: "100%", float: "right" }}>
              <p>What Happened to Your Can Waste?</p>
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
                  }}
                >
                  <h3 style={{ backgroundColor: "#aaaaaa" }}>
                    Paper Recycling
                  </h3>
                </th>
                <th
                  style={{
                    paddingLeft: "5px",
                    paddingRight: "5px",
                    textAlign: "center",
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
                    display: "flex",
                    flexDirection: "column",
                    padding: "20px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    style={{ width: "300px", margin: "5px" }}
                    src={can1}
                    alt="image1"
                    height="150"
                  />
                  <img
                    style={{ width: "300px", margin: "5px" }}
                    src={can2}
                    alt="image2"
                    height="300"
                  />
                </td>
                <td
                  style={{
                    // display: 'flex',
                    // flexDirection: 'column',
                    padding: "30px",
                  }}
                >
                  <img
                    style={{
                      width: "300px",
                      display: "block",
                      margin: "0 auto",
                    }}
                    src={can3}
                    alt="image3"
                  />
                </td>
                <td
                  style={{
                    // display: 'flex',
                    // flexDirection: 'column',
                    padding: "30px",
                  }}
                >
                  <img
                    style={{
                      width: "300px",
                      display: "block",
                      margin: "0 auto",
                    }}
                    src={can4}
                    alt="image4"
                  />
                </td>
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

export default CanRecycling;
