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
  Paper: '#5886a5',
  Plastic: '#de425b',
  Can: '#78ab63',
  Glass: '#FFF314',
  'E-waste': '#FF7F00',
  Organic: '#654321',
};

export default class Example extends Component {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

  render() {
    const { data } = this.props;
    // console.log(data);
    return (
      data.length > 0 ?
        <ResponsiveContainer width={500} height={250}>
          <BarChart
            data={data}
            margin={{
              top: 5, right: 0, left: 0, bottom: 5,
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
        </ResponsiveContainer>
        :
        <p style={{ textAlign: 'center', lineHeight: '250px' }}>No Data</p>
    );
  }
}
