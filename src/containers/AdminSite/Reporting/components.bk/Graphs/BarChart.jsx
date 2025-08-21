/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer, LabelList,
} from 'recharts';
// import {
//   ResponsiveContainer,
// } from 'recharts';

// const data = [
//   { name: 'Paper', value: 1 },
//   { name: 'Plastic', value: 2 },
//   { name: 'Can', value: 1.5 },
// ];

const colors = {
  Papers: '#5886a5',
  Plastics: '#de425b',
  Cans: '#78ab63',
  Glasses: '#FFF314',
  'E-waste': '#FF7F00',
  Organic: '#654321',
};

export default class Example extends Component {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';
  state = {
    data: [],
  }
  componentWillMount() {
    const { data } = this.state;
    const productTypes = {};
    for (let i = 0; i < this.props.data.length; i += 1) {
      if (!Object.keys(productTypes).includes(this.props.data[i].productType)) {
        productTypes[this.props.data[i].productType] = Object.keys(productTypes).length;
        data.push({
          name: this.props.data[i].productType,
          value: parseFloat(this.props.data[i].quantity.toFixed(2)),
        });
      } else {
        data[productTypes[this.props.data[i].productType]].value =
        data[productTypes[this.props.data[i].productType]].value + this.props.data[i].quantity;
        data[productTypes[this.props.data[i].productType]].value =
        parseFloat((data[productTypes[this.props.data[i].productType]].value).toFixed(2));
      }
    }
    this.setState({ data });
  }

  render() {
    const { data } = this.state;
    return (
      // <div>
      //   {data.length > 0 &&
      //     <p>{JSON.stringify(data)}</p>
      //   }
      // </div>
      <ResponsiveContainer width={500} height={250}>
        {data.length > 0 &&
          <BarChart
            // width={500}
            // height={250}
            data={data}
            margin={{
              top: 5, right: 50, left: 0, bottom: 5,
            }}
            barGap={100}
          >
            <CartesianGrid stroke="#eeeeee" />
            <XAxis dataKey="name" />
            <YAxis padding={{ top: 30 }} />
            <Tooltip />
            <Bar dataKey="value" barSize={50} minPointSize={10}>
              <LabelList dataKey="value" position="top" />
              {
                data.map((entry, index) => (
                  <Cell
                    // eslint-disable-next-line react/no-array-index-key
                    key={`cell-${index}`}
                    align="center"
                    fill={colors[entry.name]}
                    minPointSize={10}
                  />
                ))
              }
            </Bar>
          </BarChart>
        }
      </ResponsiveContainer>
    );
  }
}
