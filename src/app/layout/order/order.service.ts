
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrderService {
  options: any;
  constructor(private http: Http) {
    let token = localStorage.getItem('userToken');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', token)
    this.options = new RequestOptions({ headers: headers });
   }

   getAllOrders(url: string, input: any): any {
    return this.http.post(url, input, this.options)
      .map((response: Response) => response.json());
  }


}
