/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { FiSearch } from 'react-icons/fi';
import ReactBootstrapTable from '../../../shared/components/table/ReactBootstrapTable';
import { getLogisticsByOrganization } from '../../../redux/actions/apiActions/logisticsActions';
import { getUserDetailWithPromise } from '../../../redux/actions/apiActions/userActions';


class DataTable extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rows: null,
      filters: {
        pickUpTime: '',
        Papers: '',
        Plastics: '',
        Cans: '',
        Glasses: '',
        Organic: '',
        'E-waste': '',
      },
      showSearch: {
        pickUpTime: false,
        Papers: false,
        Plastics: false,
        Cans: false,
        Glasses: false,
        Organic: false,
        'E-waste': false,
      },
    };

    this.heads = [
      {
        dataField: 'pickUpTime',
        text: this.renderHeaderWithSearch('Date', 'pickUpTime'),
        formatter: this.dateFormatter,
      },
      {
        dataField: 'items',
        text: this.renderHeaderWithSearch('Paper', 'Papers'),
        formatter: this.paperFormatter,
      },
      {
        dataField: 'items',
        text: this.renderHeaderWithSearch('Plastic', 'Plastics'),
        formatter: this.plasticFormatter,
      },
      {
        dataField: 'items',
        text: this.renderHeaderWithSearch('Can', 'Cans'),
        formatter: this.canFormatter,
      },
      {
        dataField: 'items',
        text: this.renderHeaderWithSearch('Glass', 'Glasses'),
        formatter: this.glassFormatter,
      },
      {
        dataField: 'items',
        text: this.renderHeaderWithSearch('Organic', 'Organic'),
        formatter: this.organicFormatter,
      },
      {
        dataField: 'items',
        text: this.renderHeaderWithSearch('E-waste', 'E-waste'),
        formatter: this.ewasteFormatter,
      },
    ];
  }

  componentWillMount() {
    const token = localStorage.getItem('jwt');
    const { id } = jwtDecode(token);
    getUserDetailWithPromise(id).then((response =>
      // eslint-disable-next-line no-underscore-dangle
      this.props.getLogisticsByOrganization(response.organizationId._id)
    ));
  }

  componentDidUpdate(prevProps) {
    if (this.props.logistics !== prevProps.logistics) {
      this.applyFilters();
    }
  }

  ewasteFormatter = cell => (
    cell.map(item => (
      item.productType === 'E-waste' && <p key={item.productName}>{item.productName}: {item.quantity} kg</p>
    ))
  )

  // eslint-disable-next-line react/sort-comp
 renderHeaderWithSearch = (label, key) => {
   const isVisible = this.state.showSearch[key];
   const filterValue = this.state.filters[key];
   return (
     <div style={{ display: 'flex', flexDirection: 'column' }}>
       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
         <span>{label}</span>
         <span
           onClick={() =>
             this.setState(prev => ({
               showSearch: {
                 ...prev.showSearch,
                 [key]: !prev.showSearch[key],
               },
             }))
           }
           style={{ cursor: 'pointer', marginLeft: '6px' }}
         >
           <FiSearch size={16} />
         </span>
       </div>
       {isVisible && (
         <input
           type="text"
           value={filterValue}
           placeholder="Search..."
           style={{ marginTop: '5px', width: '100%' }}
           onChange={e =>
             this.setState(prev => ({
               filters: {
                 ...prev.filters,
                 [key]: e.target.value,
               },
             }), this.applyFilters)
           }
         />
       )}
     </div>
   );
 }


  applyFilters = () => {
    const { filters } = this.state;
    const { logistics } = this.props;

    if (!logistics || !logistics.list) return;

    const filteredRows = logistics.list.filter((row) => {
      const dateMatch = new Date(row.pickUpTime).toLocaleDateString().includes(filters.pickUpTime);

      const matchesCategory = (category) => {
        const value = filters[category];
        if (!value) return true;
        return row.items.some(item => (
          item.productType === category &&
          item.productName.toLowerCase().includes(value.toLowerCase())
        ));
      };

      return (
        dateMatch &&
        matchesCategory('Papers') &&
        matchesCategory('Plastics') &&
        matchesCategory('Cans') &&
        matchesCategory('Glasses') &&
        matchesCategory('Organic') &&
        matchesCategory('E-waste')
      );
    });

    this.setState({ rows: filteredRows });
  }

  dateFormatter = cell => (
    <p>{new Date(cell).toLocaleDateString()}</p>
  )

  paperFormatter = cell => (
    cell.map(item => (
      item.productType === 'Papers' && <p key={item.productName}>{item.productName}: {item.quantity} kg</p>
    ))
  )

  plasticFormatter = cell => (
    cell.map(item => (
      item.productType === 'Plastics' && <p key={item.productName}>{item.productName}: {item.quantity} kg</p>
    ))
  )

  canFormatter = cell => (
    cell.map(item => (
      item.productType === 'Cans' && <p key={item.productName}>{item.productName}: {item.quantity} kg</p>
    ))
  )

  glassFormatter = cell => (
    cell.map(item => (
      item.productType === 'Glasses' && <p key={item.productName}>{item.productName}: {item.quantity} kg</p>
    ))
  )

  organicFormatter = cell => (
    cell.map(item => (
      item.productType === 'Organic' && <p key={item.productName}>{item.productName}: {item.quantity} kg</p>
    ))
  )

  ewasteFormatter = cell => (
    cell.map(item => (
      item.productType === 'E-waste' && <p key={item.productName}>{item.productName}: {item.quantity} kg</p>
    ))
  )

  render() {
    const { rows } = this.state;
    return (
      <Col md={12} lg={12}>
        <Card className="data-card">
          <CardBody>
            {rows &&
              <ReactBootstrapTable
                heads={this.heads}
                rows={rows}
              />
            }
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getLogisticsByOrganization: (organizationId) => {
    dispatch(getLogisticsByOrganization(organizationId));
  },
});

const mapStateToProps = state => ({
  logistics: state.logistics,
});

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
