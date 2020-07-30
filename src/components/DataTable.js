import React from 'react';
import { MDBDataTable } from 'mdbreact';

const DataTable = () => {
  const data = {
    columns: this.props.columns,
    rows: this.props.rows
  };

  return (
    <MDBDataTable
      striped
      bordered
      hover
      data={data}
    />
  );
}

export default DataTable;