import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  public getReportObjectFromJSON(): Observable<any> {
    let result$ = this.http.get('./assets/ReportObj.json');
    return result$;
  }
  public async getReportObjectFromJSONAsync(): Promise<any> {
    let result$ = this.http.get('./assets/ReportObj.json');
    return await lastValueFrom(result$);
  }
}
