import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

export interface User {
  isSelected: boolean;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  isEdit: boolean;
}

export const UserColumns = [
  {
    key: 'isSelected',
    type: 'isSelected',
    label: '',
  },
  {
    key: 'firstName',
    type: 'text',
    label: 'First Name',
  },
  {
    key: 'lastName',
    type: 'text',
    label: 'Last Name',
  },
  {
    key: 'gender',
    type: 'select',
    label: 'Gender',
  },
  {
    key: 'email',
    type: 'email',
    label: 'Email',
  },
  {
    key: 'birthDate',
    type: 'date',
    label: 'Date of Birth',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];

@Component({
  selector: 'app-api-editable-table',
  templateUrl: './api-editable-table.component.html',
  styleUrls: ['./api-editable-table.component.scss'],
})
export class ApiEditableTableComponent implements OnInit {
  displayedColumns: string[] = UserColumns.map((col) => col.key);
  columnsSchema: any = UserColumns;
  dataSource = new MatTableDataSource<User>();
  resultsLength: number = 0;

  pageEvent!: PageEvent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog, private userService: UserService) {}

  async ngOnInit() {
    /**Observable way */
    // this.userService.getUsers().subscribe((res: any) => {
    //   this.dataSource.data = res;
    // });
    /**Promise way */
    this.dataSource.data = await this.userService.getUsersAsync();
    this.dataSource.paginator = this.paginator;

    this.resultsLength = this.dataSource.data.length;
  }

  async editRow(row: User) {
    /**Observable way */

    // if (row.id === 0) {
    //   this.userService.addUser(row).subscribe((newUser: User) => {
    //     row.id = newUser.id;
    //     row.isEdit = false;
    //   });
    // } else {
    //   this.userService.updateUser(row).subscribe(() => (row.isEdit = false));
    // }

    /**Promise way */
    if (row.id === 0) {
      let newUser = await this.userService.addUserAsync(row);
      row.id = newUser.id;
      row.isEdit = false;
    } else {
      await this.userService.updateUserAsync(row);
      row.isEdit = false;
    }
  }

  addRow() {
    const newRow: User = {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      birthDate: '',
      isEdit: true,
      isSelected: false,
    };
    this.dataSource.data = [newRow, ...this.dataSource.data];
  }

  async removeRow(id: number) {
    /**Observable way */

    // this.userService.deleteUser(id).subscribe(() => {
    //   this.dataSource.data = this.dataSource.data.filter(
    //     (u: User) => u.id !== id
    //   );
    // });
    /**Promise way */
    await this.userService.deleteUserAsync(id);
    this.dataSource.data = this.dataSource.data.filter(
      (u: User) => u.id !== id
    );
    this.dataSource.data = [...this.dataSource.data];
  }

  //#region For header checkbox
  isAllSelected() {
    return this.dataSource.data.every((item: any) => item.isSelected);
  }

  isAnySelected() {
    return this.dataSource.data.some((item: any) => item.isSelected);
  }

  selectAll(event: any) {
    this.dataSource.data = this.dataSource.data.map((item: any) => ({
      ...item,
      isSelected: event.checked,
    }));
  }

  async removeSelectedRows() {
    const users = this.dataSource.data.filter((u: User) => u.isSelected);
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe(async (confirm) => {
        if (confirm) {
          /**Observable way */

          // this.userService.deleteUsers(users).subscribe(() => {
          //   this.dataSource.data = this.dataSource.data.filter(
          //     (u: User) => !u.isSelected
          //   );
          // });

          /**Promise way */
          for await (const user of users) {
            await this.userService.deleteUserAsync(user.id);
            this.dataSource.data = this.dataSource.data.filter(
              (u: User) => !u.isSelected
            );
          }
        }
      });
  }
  //#endregion

  onPageChange(event: PageEvent): any {
    console.log('PageIndex: ', event.pageIndex);
    console.log('PageSize: ', event.pageSize);
  }
}
