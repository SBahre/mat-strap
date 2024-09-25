import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable, interval, of } from 'rxjs';
import { result } from 'lodash';

@Component({
  selector: 'app-report-pagination',
  templateUrl: './report-pagination.component.html',
  styleUrls: ['./report-pagination.component.scss'],
})
export class ReportPaginationComponent implements OnInit {
  //#region Properties
  reportObject: any;
  length = 20;
  pageSize = 10;
  pageEvent = <PageEvent>{};
  rows: string[][] = [];
  slicedRows: string[][] = [];
  fields: undefined;

  //#endregion

  @ViewChild('paginator')
  paginator!: MatPaginator;
  intervalId: any;

  constructor(private reportService: ReportService) {}

  async ngOnInit() {
    let result = await this.reportService.getReportObjectFromJSONAsync();
    this.reportObject = result;
    this.fields = result.content.missed.fields;
    this.rows = result.content.missed.rows;
    console.log(this.rows);

    this.length = result.content.missed.rows.length;

    this.pageEvent.pageIndex = 0;
    this.pageEvent.length = 0;
    this.pageEvent.pageSize = 10;
    this.pageEvent.previousPageIndex = 0;
    //this.rows = this.rows.slice(0, this.pageSize);
    this.onNavigation(this.pageEvent);
    interval(5 * 1000).subscribe(() => {
      this.onAutoFLip(this.pageEvent);
    });
  }

  onNavigation(event: PageEvent) {
    this.pageEvent = event;
  }

  onAutoFLip(event: PageEvent) {
    if (this.paginator.hasNextPage()) console.log('onAutoFLip');

    this.pageEvent.pageIndex = event.pageIndex + 1;

    this.slicedRows = this.rows.slice(
      this.pageEvent.pageIndex * this.paginator.pageSize,
      (this.pageEvent.pageIndex + 1) * this.paginator.pageSize
    );
    this.paginator.pageIndex = this.pageEvent.pageIndex;
    console.log(this.slicedRows);
  }
}
