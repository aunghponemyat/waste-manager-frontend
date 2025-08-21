/* eslint-disable no-restricted-syntax */
/* eslint-disable no-return-assign */
/* eslint-disable max-len */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
// import JqxTreeMap from 'jqwidgets-react/react_jqxtreemap.js';
import jwtDecode from 'jwt-decode';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css';
import JqxTreeMap from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtreemap';

import Panel from '../../../../shared/components/Panel';
import { getUserDetailWithPromise } from '../../../../redux/actions/apiActions/userActions';
import { getCommonItemsFound } from '../../../../redux/actions/apiActions/logisticsActions';

class ItemsReportTable extends PureComponent {
  state = {
    items: null,
  }
  componentWillMount() {
    console.log('start');
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
  }

  createData = (items) => {
    const data = [];
    const colors = {
      Paper: '#5886A5',
      Plastic: '#de425b',
      Can: '#8ac771',
      Glass: '#EBA434',
      'E-waste': '#FFF200',
      Organic: '#a38e79',
    };
    if (items) {
      // eslint-disable-next-line guard-for-in
      for (const key in items) {
        // data.push({ label: key, value: 10, color: colors[key] });
        // eslint-disable-next-line guard-for-in
        for (const productName in items[key]) {
          data.push({
            label: productName, value: items[key][productName], color: colors[key],
          });
        }
      }
    }
    return data;
  }

  render() {
    const { items } = this.state;
    const { firstMonth, lastMonth } = this.props;
    return (
      <Panel
        lg={6}
        xl={6}
        md={6}
        panelClass="panel--narrow"
      >
        <p style={{ fontSize: 10 }}>{firstMonth} - {lastMonth}</p>
        <div style={{ height: 10 }} />
        {items &&
          <JqxTreeMap
            width="100%"
            source={items}
          />
        }
      </Panel>
    );
  }
}

export default ItemsReportTable;
