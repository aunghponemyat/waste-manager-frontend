/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-operators */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import {
  PieChart, Pie, ResponsiveContainer, Sector, Cell,
} from 'recharts';
import { connect } from 'react-redux';

import { getTotalWasteData } from '../../../../redux/actions/apiActions/miscActions';

// const COLORS = ['#488f31', '#fff59f', '#de425b', '#004c6d', '#00ffff', '#bc5090'];
// const COLORS = ['#EF95E2', '#7CB8F6', '#09C7C9', '#6BC685', '#B5B95C', '#E6A667'];
const COLORS = {
  Plastics: '#de425b',
  Papers: '#5886a5',
  Cans: '#78ab63',
  Organic: '#654321',
  'E-waste': '#FF7F00',
  Glasses: '#fff314',
};
// ['#EF95E2', '#7CB8F6', '#09C7C9', '#6BC685', '#B5B95C', '#E6A667']
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    // eslint-disable-next-line react/prop-types
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    // eslint-disable-next-line react/prop-types
    fill, payload, percent, name, quantity,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#aaa">{`${name}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#aaa">
        {/* {`(Rate ${(percent * 100).toFixed(2)}%)${quantity}`} */}
        {`${quantity} kg (${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

class OverviewPieChart extends PureComponent {
  state = {
    activeIndex: 0,
    filter: null,
  };

  componentWillMount() {
    if (this.props.misc && this.props.misc.filterOrganization) {
      this.setState({
        filter: this.props.misc.filterOrganization,
      });
    }
    this.props.getTotalWasteData(this.props.misc.filterOrganization);
  }

  componentDidUpdate() {
    if (this.props.misc && this.state.filter !== this.props.misc.filterOrganization) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(
        {
          filter: this.props.misc.filterOrganization,
        },
        this.props.getTotalWasteData(this.props.misc.filterOrganization),
      );
    }
  }

  // eslint-disable-next-line no-shadow
  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const { totalWastes } = this.props.misc;
    return (
      <Col xs={12} md={12} lg={12} xl={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h4 className="bold__panel">Overview Waste Collection</h4>
            </div>
            {(totalWastes && totalWastes.length > 0) ?
              <ResponsiveContainer height={400}>
                <div className="piechart">
                  <PieChart width={600} height={400}>
                    <Pie
                      activeIndex={this.state.activeIndex}
                      activeShape={renderActiveShape}
                      data={totalWastes}
                      cx={300}
                      cy={200}
                      innerRadius={80}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="quantity"
                      onMouseEnter={this.onPieEnter}
                    >
                      {totalWastes.map((entry, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                      ))}
                    </Pie>
                  </PieChart>
                </div>
              </ResponsiveContainer>
              :
              <h5 style={{ textAlign: 'center' }}>There is no waste data.</h5>
            }
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getTotalWasteData: (organization) => {
    dispatch(getTotalWasteData(organization));
  },
});

const mapStateToProps = state => ({
  misc: state.misc,
});

export default connect(mapStateToProps, mapDispatchToProps)(OverviewPieChart);
