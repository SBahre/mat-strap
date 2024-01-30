import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from './customer';
import { Observable, lastValueFrom } from 'rxjs';
import { IPeriodicElement } from '../resources/element';
// import {db.json} from '../../assets';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  baseURL: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  getCustomer(): Observable<any> {
    return this.http.get<Customer[]>('../../assets/db.json');
  }

  getElements(): Promise<IPeriodicElement[]> {
    let url = this.baseURL + 'element';
    let result = this.http.get<IPeriodicElement[]>(url);
    return lastValueFrom(result);
  }

  addElement(element: IPeriodicElement): Promise<IPeriodicElement> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(element);
    console.log(body);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    let result = this.http.post<IPeriodicElement>(
      this.baseURL + 'element',
      body,
      httpOptions
    );
    return lastValueFrom(result);
  }
}
