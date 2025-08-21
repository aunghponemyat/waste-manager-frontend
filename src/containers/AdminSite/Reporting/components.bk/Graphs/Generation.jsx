// /* eslint-disable react/no-array-index-key */
// /* eslint-disable react/prop-types */
// /* eslint-disable react/prefer-stateless-function */
// /* eslint-disable max-len */
// import React, { PureComponent } from 'react';
// import { Container, Row, Col } from 'reactstrap';
// import BarChart from './BarChart';
// import '../../../../../scss/report/Generation.scss';

// class Generation extends PureComponent {
//   render() {
//     const { data, title } = this.props;
//     return (
//       <div className="generation-page">
//         <div className="generation-content">
//           <h3>{title}</h3>
//           <Container className="dashboard">
//             <Row>
//               {data && data.map((item, key) => (
//                 <Col key={key} md={6} lg={6}>
//                   <p>Pick Up ({new Date(item.pickUpTime).toDateString()})</p>
//                   <BarChart data={item.items} />
//                   <ul><li>Yever recycled 13.7 KG of recyclable waste in June.</li></ul>
//                 </Col>
//               ))}
//             </Row>
//           </Container>
//         </div>
//       </div>
//     );
//   }
// }

// export default Generation;

/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import BarChart from './BarChart';
import '../../../../../scss/report/Generation.scss';

const months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

class Generation extends Component {
  state ={
    fixedData: null,
  }

  componentWillMount() {
    const { data } = this.props;
    const fixedData = [];
    const pickUpDates = {};
    for (let i = 0; i < data.length; i += 1) {
      const date = new Date(data[i].pickUpTime);
      const pickUpDate = `1-${months[date.getMonth()]}-${date.getFullYear()}`;
      if (!Object.keys(pickUpDates).includes(pickUpDate)) {
        pickUpDates[pickUpDate] = Object.keys(pickUpDates).length;
        fixedData.push({
          pickUpTime: pickUpDate,
          items: data[i].items,
        });
      } else {
        const items = [];
        items.push(...fixedData[pickUpDates[pickUpDate]].items, ...data[i].items);
        fixedData[pickUpDates[pickUpDate]].items = items;
      }
    }
    for (let i = 0; i < fixedData.length; i += 1) {
      let total = 0;
      for (let j = 0; j < fixedData[i].items.length; j += 1) {
        total += fixedData[i].items[j].quantity;
      }
      fixedData[i].total = total.toFixed(2);
    }
    this.setState({
      fixedData,
    });
  }

  render() {
    const { fixedData } = this.state;
    const {
      organization,
    } = this.props;
    return (
      <div>
        <div className="generation-content">
          <Container className="dashboard">
            <Row>
              {/* <p>{JSON.stringify(data)}</p> */}
              {fixedData && fixedData.map((item, key) => (
                <Col key={key} md={6} lg={6} style={{ paddingTop: '20px' }}>
                  <p>Pick Up ({months[new Date(item.pickUpTime).getMonth()]} {new Date(item.pickUpTime).getFullYear()})</p>
                  <BarChart data={item.items} />
                  <ul><li>{organization} recycled {item.total} KG of recyclable waste in {months[new Date(item.pickUpTime).getMonth()]}.</li></ul>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Generation;
