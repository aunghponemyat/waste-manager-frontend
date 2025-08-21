// /* eslint-disable react/no-unused-state,react/no-unescaped-entities */
// import React, { PureComponent } from 'react';
// import { Card, CardBody, Col } from 'reactstrap';
// import DataPaginationTable from '../../../../shared/components/table/DataPaginationTable';
// import Pagination from '../../../../shared/components/pagination/Pagination';

// class SchedulesTable extends PureComponent {
//   constructor() {
//     super();
//     this.heads = [
//       {
//         key: 'id',
//         name: '#',
//         width: 80,
//       },
//       {
//         key: 'pickedUpDate',
//         name: 'Picked Up Date',
//         sortable: false,
//       },
//       {
//         key: 'status',
//         name: 'Status',
//         sortable: false,
//       },
//       {
//         key: 'driver',
//         name: 'Driver Name',
//         sortable: false,
//       },
//     ];

//     const initialPageNumber = 1;
//     const initialRowsCount = 10;

//     const minRows = 20;
//     const maxRows = 41;
//     const rowsCount = Math.random() * (maxRows - minRows);

//     const originalRows = this.createRows(rowsCount + minRows);
//     const currentPageRows = this.filterRows(originalRows, initialPageNumber, initialRowsCount);

//     this.state = {
//       rows: originalRows,
//       rowsToShow: currentPageRows,
//       pageOfItems: initialPageNumber,
//       itemsToShow: initialRowsCount,
//     };
//   }

//   onChangePage = (pageOfItems) => {
//     const { rows, itemsToShow } = this.state;
//     if (pageOfItems) {
//       const rowsToShow = this.filterRows(rows, pageOfItems, itemsToShow);
//       this.setState({ rowsToShow, pageOfItems });
//     }
//   };

//   getRandomDate = (start, end) => new Date(start.getTime() + (Math.random() * (end.getTime()
//     - start.getTime()))).toLocaleDateString();

//   createRows = (numberOfRows) => {
//     const rows = [];
//     for (let i = 1; i < numberOfRows + 1; i += 1) {
//       rows.push({
//         id: i,
//         pickedUpDate: this.getRandomDate(new Date(2002, 3, 1), new Date(1954, 3, 1)),
//         status: ['completed', 'on going', 'assigned'][Math.floor((Math.random() * 3))],
//         driver: ['Ko Ko', 'Mg Mg', 'U Zaw'][Math.floor((Math.random() * 3))],
//         // first: ['Maria', 'Bobby  ', 'Alexander'][Math.floor((Math.random() * 3))],
//         // last: ['Morisson', 'Brown  ', 'Medinberg'][Math.floor((Math.random() * 3))],
//         // user: ['@dragon', '@hamster', '@cat'][Math.floor((Math.random() * 3))],
//         // age: Math.min(100, Math.round(Math.random() * 30) + 20),
//         // date: this.getRandomDate(new Date(2002, 3, 1), new Date(1954, 3, 1)),
//         // location: ['Melbourne', 'Tokio', 'Moscow', 'Rome'][Math.floor((Math.random() * 4))],
//         // work: ['Nova Soft', 'Dog Shop', 'Aspirity', 'Business Bro', 'Starlight'][Math.floor((Math.random() * 5))],
//       });
//     }
//     return rows;
//   };

//   filterRows = (originalRows, pageNumber, rowsOnPage) => {
//     const rowsFrom = rowsOnPage * (pageNumber - 1);
//     const rowsTo = rowsFrom + rowsOnPage;
//     return originalRows.slice(rowsFrom, rowsTo);
//   };

//   render() {
//     const {
//       rows, itemsToShow, pageOfItems, rowsToShow,
//     } = this.state;

//     return (
//       <Col md={12} lg={12}>
//         <Card>
//           <CardBody>
//             {/* <div className="card__title">
//               <h5 className="bold-text">data table</h5>
//               <h5 className="subhead">Use table with column's option <span className="red-text">sortable</span></h5>
//             </div> */}
//             <DataPaginationTable
//               heads={this.heads}
//               rows={rowsToShow}
//             />
//             <Pagination
//               itemsCount={rows.length}
//               itemsToShow={itemsToShow}
//               pageOfItems={pageOfItems}
//               onChangePage={this.onChangePage}
//             />
//           </CardBody>
//         </Card>
//       </Col>
//     );
//   }
// }

// export default SchedulesTable;

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unused-state,react/no-unescaped-entities */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import ReactBootstrapTable from '../../../../shared/components/table/ReactBootstrapTable';
import history from '../../../../shared/utils/history';

class SchedulesTable extends PureComponent {
  constructor() {
    super();

    const status = {
      COMPLETED: 'COMPLETED',
      ASSIGNED: 'ASSIGNED',
      ONGOING: 'ONGOING',
    };

    this.heads = [
      {
        dataField: 'id',
        text: '#',
      },
      {
        dataField: 'pickedUpDate',
        text: 'Picked Up Date ',
        filter: textFilter(),
      },
      {
        dataField: 'status',
        text: 'Status ',
        formatter: cell => status[cell],
        filter: selectFilter({
          options: status,
        }),

      },
      {
        dataField: 'driver',
        text: 'Driver Name ',
        filter: textFilter(),
      },
    ];

    const minRows = 20;
    const maxRows = 41;
    const rowsCount = Math.random() * (maxRows - minRows);

    const originalRows = this.createRows(rowsCount + minRows);

    this.state = {
      rows: originalRows,
    };
  }

  getRandomDate = (start, end) => new Date(start.getTime() + (Math.random() * (end.getTime()
    - start.getTime()))).toLocaleDateString();

  createRows = (numberOfRows) => {
    const rows = [];
    for (let i = 1; i < numberOfRows + 1; i += 1) {
      rows.push({
        id: i,
        pickedUpDate: this.getRandomDate(new Date(2002, 3, 1), new Date(1954, 3, 1)),
        status: ['COMPLETED', 'ONGOING', 'ASSIGNED'][Math.floor((Math.random() * 3))],
        driver: ['Ko Ko', 'Mg Mg', 'U Zaw'][Math.floor((Math.random() * 3))],
      });
    }
    return rows;
  };

  deleteButton = cell => (
    // <Button
    //   className="icon"
    //   color="danger"
    //   onClick={() => alert(cell)}
    // >
    //   <p><span className="lnr lnr-trash" /></p>
    // </Button>
    <Row style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '30px' }}>
        <p onClick={() => alert(cell)} style={{ textAlign: 'center' }}><span
          className="lnr lnr-trash"
          style={{ color: '#ff4861', cursor: 'pointer' }}
        />
        </p>
      </div>
      <div style={{ width: '30px' }}>
        <p onClick={this.redirectToEditPage}><span
          className="lnr lnr-pencil"
          style={{ color: '#00c0d4', cursor: 'pointer' }}
        />
        </p>
      </div>
    </Row>
  );

  redirectToEditPage = () => {
    history.push('/users/edit');
    window.location.reload(true);
  }

  render() {
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <ReactBootstrapTable
              heads={this.heads}
              rows={this.state.rows}
            />
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default SchedulesTable;
