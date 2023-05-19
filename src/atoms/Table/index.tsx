import { useState } from 'react';
import DataTable, { Alignment } from 'react-data-table-component';

const columns = [
  { name: 'Name', selector: row => row.name, reorder: true },
  { name: 'Email', selector: row => row.email, reorder: true },
  { name: 'Age', selector: row => row.age, reorder: true },
];

const data = [
  { id: 1, name: 'Anton', email: 'anton@gmail.com', age: '23' },
  { id: 2, name: 'Alex', email: 'alex@gmail.com', age: '22' },
  { id: 3, name: 'Andrei', email: 'andrei@gmail.com', age: '21' },
  { id: 4, name: 'Nike', email: 'nike@gmail.com', age: '20' },
  { id: 12, name: 'Anton', email: 'anton@gmail.com', age: '23' },
  { id: 22, name: 'Alex', email: 'alex@gmail.com', age: '22' },
  { id: 32, name: 'Andrei', email: 'andrei@gmail.com', age: '21' },
  { id: 42, name: 'Nike', email: 'nike@gmail.com', age: '20' },
  { id: 19, name: 'Anton', email: 'anton@gmail.com', age: '23' },
  { id: 29, name: 'Alex', email: 'alex@gmail.com', age: '22' },
  { id: 39, name: 'Andrei', email: 'andrei@gmail.com', age: '21' },
  { id: 49, name: 'Nike', email: 'nike@gmail.com', age: '20' },
  { id: 17, name: 'Anton', email: 'anton@gmail.com', age: '23' },
  { id: 27, name: 'Alex', email: 'alex@gmail.com', age: '22' },
  { id: 37, name: 'Andrei', email: 'andrei@gmail.com', age: '21' },
  { id: 47, name: 'Nike', email: 'nike@gmail.com', age: '20' },
];
const paginationRowsPerPageList = [5, 10, 15, 20];

export default function Table() {
  const [fields, setFields] = useState(data);

  return (
    <div className="max-w-screen-desktop mx-auto">
      <DataTable
        columns={columns}
        data={fields}
        subHeader={true}
        subHeaderComponent={<div>dasadsad</div>}
        subHeaderAlign={Alignment.LEFT}
        pagination
        highlightOnHover
        paginationRowsPerPageOptions={paginationRowsPerPageList}
      />
    </div>
  );
}
