/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Legend,
} from 'recharts';

// const data = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 1 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];

const COLORS = {
  Paper: '#5886a5',
  Plastic: '#de425b',
  Can: '#78ab63',
  Glass: '#FFF314',
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

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
    const { data } = this.props;
    const tmp = [];
    for (const key in data) {
      tmp.push({
        name: wastes[key],
        value: data[key],
      });
    }
    console.log(tmp);
    this.setState({ data: tmp });
  }

  render() {
    const { data } = this.state;
    return (
      <ResponsiveContainer width={550} height={350}>
        {data.length > 0 &&
          <PieChart>
            <Legend />
            <Pie
              data={data}
              cx={275}
              cy={150}
              labelLine
              label={renderCustomizedLabel}
              // outerRadius={120}
              innerRadius={40}
              outerRadius={100}
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
        }
      </ResponsiveContainer>
    );
  }
}
