import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  public getReportObjectFromJSON(): Observable<any> {
    let result$ = this.http.get('./assets/ReportObj.json');
    return result$;
  }
}
