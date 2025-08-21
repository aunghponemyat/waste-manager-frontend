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
  Papers: '#5886a5',
  Plastics: '#de425b',
  Cans: '#78ab63',
  Glasses: '#fff314',
  'E-waste': '#FF7F00',
  Organic: '#654321',
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
    const { data } = this.state;
    const productTypes = {};
    for (let i = 0; i < this.props.data.length; i += 1) {
      if (!Object.keys(productTypes).includes(this.props.data[i].productType)) {
        productTypes[this.props.data[i].productType] = i;
        data.push({
          name: this.props.data[i].productType,
          value: this.props.data[i].quantity,
        });
      } else {
        data[this.props.data[i].productType] += this.props.data[i].quantity;
      }
    }
    this.setState({ data });
  }

  render() {
    const { data } = this.state;
    return (
      <ResponsiveContainer width={550} height={250}>
        {data.length > 0 &&
          <PieChart>
            <Legend />
            <Pie
              data={data}
              cx={275}
              cy={120}
              labelLine
              label={renderCustomizedLabel}
              outerRadius={60}
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
