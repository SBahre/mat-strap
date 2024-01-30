import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  masterList: string[] = [
    'indicator 1',
    'indicator 2',
    'indicator 3',
    'comp1',
    'comp2',
    'comp3',
    'mod1',
  ];

  currentList: string[] = [];

  movefromMasterList: string[] = [];
  movefromSelectedList: string[] = [];
  changeItemOrder: string = '';

  //@ViewChild('masterPaginator') masterPaginator: MatPaginator;
  //@ViewChild('currentPaginator') currentPaginator: MatPaginator;

  onBackwardClick() {
    this.movefromSelectedList.forEach((item) => {
      const index = this.currentList.indexOf(item, 0);
      if (index > -1) {
        this.currentList.splice(index, 1);
      }
      this.masterList.push(item);
    });
    this.movefromSelectedList = [];
  }

  onForwardClick() {
    //remove 'event' from Param
    this.movefromMasterList.forEach((item) => {
      const index = this.masterList.indexOf(item, 0);
      if (index > -1) {
        this.masterList.splice(index, 1);
      }
      this.currentList.push(item);
    });

    this.movefromMasterList = [];
  }

  addToMasterMoveList(event: string) {
    const index = this.movefromMasterList.indexOf(event, 0);
    if (index === -1) {
      this.movefromMasterList.push(event);
    }
  }

  addToSelectedMoveList(event: string) {
    this.changeItemOrder = event;
    const index = this.movefromSelectedList.indexOf(event, 0);
    if (index === -1) {
      this.movefromSelectedList.push(event);
    } else if (index > -1) {
      this.movefromSelectedList.splice(index, 1);
    }
  }

  onMoveup() {
    const oldIndex = this.getIndex(this.currentList, this.changeItemOrder);
    if (oldIndex != 0) {
      const newIndex = oldIndex - 1;
      this.currentList[oldIndex] = this.currentList[newIndex];
      this.currentList[newIndex] = this.changeItemOrder;
    }
  }

  onMoveDown() {
    const oldIndex = this.getIndex(this.currentList, this.changeItemOrder);
    if (oldIndex != this.currentList.length - 1) {
      const newIndex = oldIndex + 1;
      this.currentList[oldIndex] = this.currentList[newIndex];
      this.currentList[newIndex] = this.changeItemOrder;
    }
  }

  private getIndex(arr: Array<any>, item: any): number {
    let index = arr.findIndex((x) => x === item);
    return index;
  }
}
