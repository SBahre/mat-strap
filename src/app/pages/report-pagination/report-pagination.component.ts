import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { PageEvent } from '@angular/material/paginator';
import { Observable, of } from 'rxjs';
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
  pageEvent: PageEvent | undefined;
  rows: Observable<any> | undefined;
  allRow: Observable<any> | undefined;
  fields: undefined;

  //#endregion
  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.reportService.getReportObjectFromJSON().subscribe((result) => {
      this.reportObject = result;
      this.fields = result.content.missed.fields;
      console.log(this.fields);
      this.rows = of(result.content.missed.rows);
      this.length = result.content.missed.rows.length;
    });
  }

  onNavigation(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;

    //this.rows?.subscribe((res = {}));
  }
}
