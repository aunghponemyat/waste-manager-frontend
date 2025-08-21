/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Legend,
} from 'recharts';

const COLORS = {
  Paper: '#5886a5',
  Plastic: '#de425b',
  Can: '#78ab63',
  Glass: '#fff314',
  'E-waste': '#FF7F00',
  Organic: '#654321',
};

const wastes = {
  Papers: 'Paper',
  Plastics: 'Plastic',
  Cans: 'Can',
  Glasses: 'Glass',
  'E-waste': 'E-waste',
  Organic: 'Organic',
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
  const radius = 25 + innerRadius + (outerRadius - innerRadius);
  const x = cx + (radius * Math.cos(-midAngle * RADIAN));
  const y = cy + (radius * Math.sin(-midAngle * RADIAN));

  return (
    <text x={x} y={y} fill={COLORS[index]} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/c9pL8k61/';
  state = {
    data: [],
  }

  componentWillMount() {
    const { data } = this.state;
    const productTypes = {};
    for (let i = 0; i < this.props.data.length; i += 1) {
      if (!Object.keys(productTypes).includes(this.props.data[i].productType)) {
        productTypes[this.props.data[i].productType] = i;
        data.push({
          name: wastes[this.props.data[i].productType],
          value: this.props.data[i].quantity,
        });
      } else {
        data[this.props.data[i].productType] += this.props.data[i].quantity;
      }
    }
    this.setState({ data });
  }

  render() {
    const { data } = this.props;
    return (

      data.length > 0 ?
        <ResponsiveContainer width={464} height={250}>
          <PieChart
            margin={{
            top: 0, right: 0, left: 0, bottom: -10,
            }}
          >
            <Legend />
            <Pie
              data={data}
              cx={232}
              cy={120}
              labelLine
              label={renderCustomizedLabel}
              // outerRadius={60}
              innerRadius={40}
              outerRadius={80}
              stroke=""
              fill="#8884d8"
              dataKey="value"
            >
              {
                // eslint-disable-next-line react/no-array-index-key
                data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />)
              }
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        :
        <p style={{ textAlign: 'center', lineHeight: '250px' }}>No Data</p>
    );
  }
}
