import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  Component,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { filter, map, pairwise, throttleTime, timer } from 'rxjs';

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
  max = 102;
  pageSize = 20;
  currentPageIndex = 0;
  newList: string[] = [];
  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.generateList();
    this.fetchMoreFromMyList();
    // this.fetchMore();
  }

  generateList() {
    for (let i = this.min; i < this.max; i++) {
      // let str = `String ${this.getRandomIntInclusive(this.min, this.max)}`;
      let str = `string ${i}`;
      this.myList.push(str);
    }
  }

  getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
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

  fetchMore(): void {
    const images = [
      'IuLgi9PWETU',
      'fIq0tET6llw',
      'xcBWeU4ybqs',
      'YW3F-C5e8SE',
      'H90Af2TFqng',
    ];

    const newItems: { title: string; content: string; image: string }[] = [];
    for (let i = 0; i < 20; i++) {
      const randomListNumber = Math.round(Math.random() * 100);
      const randomPhotoId = Math.round(Math.random() * 4);
      newItems.push({
        title: 'List Item ' + randomListNumber,
        content:
          'This is some description of the list - item # ' + randomListNumber,
        image: `https://source.unsplash.com/${images[randomPhotoId]}/50x50`,
      });
    }

    this.loading = true;
    timer(1000).subscribe(() => {
      this.loading = false;
      this.listItems = [...this.listItems, ...newItems];
    });
  }

  fetchMoreFromMyList(): void {
    if (this.newList.length <= this.myList.length) {
      let newList = this.myList.slice(
        this.currentPageIndex * this.pageSize,
        (this.currentPageIndex + 1) * this.pageSize
      );
      this.currentPageIndex++;
      this.newList = [...this.newList, ...newList];
      console.log(`New list length: ${this.newList.length}`);
    }
  }
}
