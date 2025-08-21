import React, { PureComponent } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import PropTypes from 'prop-types';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
// import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

// const { ExportCSVButton } = CSVExport;

export default class ReactBootstrapTable extends PureComponent {
  static propTypes = {
    heads: PropTypes.arrayOf(PropTypes.shape({
      dataField: PropTypes.string,
      text: PropTypes.string,
    })).isRequired,
    rows: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    // eslint-disable-next-line react/require-default-props
    rowEvents: PropTypes.func,
  };

  setNode = (n) => {
    this.node = n;
  }

  handleGetSelectedData = () => {
    console.log(this.node.selectionContext.selected);
  }

  render() {
    const {
      heads, rows, rowEvents,
    } = this.props;
    return (
      <div className="table">
        {/* <ToolkitProvider
          keyField="id"
          data={rows}
          columns={heads}
          exportCSV
        >
          {
            props => (
              <div>
                <ExportCSVButton {...props.csvProps}>Export CSV!!</ExportCSVButton>
              </div>
            )
          }
        </ToolkitProvider> */}
        <BootstrapTable
          ref={n => this.setNode(n)}
          keyField="id"
          data={rows}
          columns={heads}
          pagination={paginationFactory()}
          filter={filterFactory()}
          bordered={false}
          rowEvents={rowEvents}
          // {...props.baseProps}
        />
      </div>
    );
  }
}
