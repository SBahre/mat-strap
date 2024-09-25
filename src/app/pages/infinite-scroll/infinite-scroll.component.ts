import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  Component,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { filter, map, pairwise, throttleTime } from 'rxjs';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss'],
})
export class InfiniteScrollComponent implements OnInit, AfterViewInit {
  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;

  title = 'Angular Infinite Scrolling List';

  listItems: { title: string; content: string; image: string }[] = [];

  loading = false;

  myList: string[] = [];
  min = 0;
  MAX = 102;
  pageSize = 20;
  currentPageIndex = 0;
  newList: string[] = [];
  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.generateList();
    this.fetchMoreFromMyList();
  }

  /**Generates data points for list to be scrolled. */
  generateList() {
    for (let i = this.min; i < this.MAX; i++) {
      let str = `string ${i}`;
      this.myList.push(str);
    }
  }

  ngAfterViewInit(): void {
    this.scroller
      .elementScrolled()
      .pipe(
        map(() => this.scroller.measureScrollOffset('bottom')),
        pairwise(),
        filter(([y1, y2]) => y2 < y1 && y2 < 140),
        throttleTime(200)
      )
      .subscribe(() => {
        this.ngZone.run(() => {
          this.fetchMoreFromMyList();
        });
      });
  }

  fetchMoreFromMyList(): void {
    if (this.newList.length < this.myList.length) {
      let newList = this.myList.slice(
        this.currentPageIndex * this.pageSize,
        (this.currentPageIndex + 1) * this.pageSize
      );
      this.currentPageIndex++;
      this.newList = [...this.newList, ...newList];
      console.log(`New list length: ${this.newList.length}`);
    }
    // else if ((this.newList.length = this.myList.length)) {
    //   console.log('The end...RIP');
    // }
  }
}
