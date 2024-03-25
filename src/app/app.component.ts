import { Component, ViewChild } from '@angular/core';
import { MasterService } from './services/master.service';
import { Customer } from './services/customer';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

export interface Employee {
  empId: number;
  empName: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  empDict: { [key: string]: string } = {
    empId: 'Employee Id',
    empName: 'Employee Name',
  };

  empDetails: Employee = {
    empId: 21,
    empName: 'Kidda',
  };
  customerList!: Array<Customer>;
  dataSource: any;
  displayedColumns: string[] = [
    'code',
    'name',
    'email',
    'phone',
    'status',
    'action',
  ];
  date!: Date;
  mixList = [
    'Shubham',
    7,
    8,
    'Bahre',
    '10',
    12.45,
    '98.75',
    0.0,
    48.0,
    '98.5',
    '27.00',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dob: string = '07/08/1991';
  constructor(private service: MasterService) {
    this.service.getCustomer().subscribe((res) => {
      this.customerList = res.customer;
      this.dataSource = new MatTableDataSource<Customer>(this.customerList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.date = new Date(2023, 11, 20);
  }

  filterChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
  valueChanged(event: any) {
    console.log(event);
    console.log(this.date);
  }

  updateCalcs() {
    console.log(this.date);
    console.log(this.date.toLocaleDateString());
    console.log(this.date.toUTCString());
    console.log(new Date(this.date).toISOString());
  }
}
