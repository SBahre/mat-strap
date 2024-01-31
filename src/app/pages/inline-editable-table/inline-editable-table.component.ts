import { Component } from '@angular/core';

const USER_DATA = [
  { name: 'John Smith', occupation: 'Advisor', age: 36 },
  { name: 'Muhi Masri', occupation: 'Developer', age: 28 },
  { name: 'Peter Adams', occupation: 'HR', age: 20 },
  { name: 'Lora Bay', occupation: 'Marketing', age: 43 },
];

const COLUMNS_SCHEMA = [
  {
    key: 'name',
    type: 'text',
    label: 'Full Name',
  },
  {
    key: 'occupation',
    type: 'text',
    label: 'Occupation',
  },
  {
    key: 'age',
    type: 'number',
    label: 'Age',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];

@Component({
  selector: 'app-inline-editable-table',
  templateUrl: './inline-editable-table.component.html',
  styleUrls: ['./inline-editable-table.component.scss'],
})
export class InlineEditableTableComponent {
  //displayedColumns: string[] = ['name', 'occupation', 'age'];
  /**This makes displayed columns dynamic */
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource: any = USER_DATA;
  columnsSchema: any = COLUMNS_SCHEMA;
}
