/* eslint-disable no-restricted-syntax */
/* eslint-disable no-return-assign */
/* eslint-disable max-len */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import jwtDecode from 'jwt-decode';

import Panel from '../../../../shared/components/Panel';
import { getUserDetailWithPromise } from '../../../../redux/actions/apiActions/userActions';
import { getCommonItemsFound } from '../../../../redux/actions/apiActions/logisticsActions';

const colors = {
  Paper: '#658ca6',
  Plastic: '#db5e73',
  Can: '#8ac771',
  Glass: '#FFF314',
  'E-waste': '#FF7F00',
  Organic: '#a38e79',
};

class CommonItemsFoundGraph extends PureComponent {
  state = {
    items: null,
    itemTypes: null,
  }
  componentWillMount() {
    console.log('start');
    // let items;
    const token = localStorage.getItem('jwt');
    const { id } = jwtDecode(token);
    getUserDetailWithPromise(id).then((response =>
      // eslint-disable-next-line no-underscore-dangle
      getCommonItemsFound(response.organizationId._id).then((res =>
        this.setState({
          items: this.createData(res),
        })
      ))
    ));
    // const data = [];
    // console.log(items);
  }

  createData = (items) => {
    console.log(items);
    const data = [];
    const itemTypes = [];
    if (items) {
      // eslint-disable-next-line guard-for-in
      for (const key in items) {
        // data.push({ label: key, value: 10, color: colors[key] });
        if (!itemTypes.includes(key)) {
          itemTypes.push(key);
        }
        // eslint-disable-next-line guard-for-in
        for (const productName in items[key]) {
          data.push({
            label: productName, [key]: items[key][productName], color: colors[key],
          });
        }
      }
    }
    this.setState({ itemTypes });
    return data;
  }

  render() {
    const { items, itemTypes } = this.state;
    const { firstMonth, lastMonth } = this.props;
    console.log(itemTypes);
    return (
      <Panel
        lg={12}
        xl={12}
        md={12}
        title="Common Items Found in Waste Audits"
        panelClass="panel--narrow"
      >
        <p style={{ fontSize: 10 }}>{firstMonth} - {lastMonth}</p>
        <div style={{ height: 10 }} />
        {items &&
        <ResponsiveContainer height={600} className="dashboard__active-users-chart">
          <BarChart
            width={600}
            height={600}
            data={items}
            layout="vertical"
            margin={{
              top: 5,
              right: 20,
              left: 20,
              bottom: 5,
            }}
          >
            <YAxis type="category" dataKey="label" tickSize mirror />
            <XAxis type="number" />
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <Tooltip />
            <Legend />
            {itemTypes && itemTypes.map(item => <Bar dataKey={item} fill={colors[item]} barSize={10} />)}
          </BarChart>
        </ResponsiveContainer>
        }
      </Panel>
    );
  }
}

export default CommonItemsFoundGraph;
