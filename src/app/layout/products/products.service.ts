import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { product } from '../../shared/DTOs/product';

@Injectable()
export class ProductsService {
  options: any;
  constructor(private http: Http) {
    let token = localStorage.getItem('userToken');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', token)
    this.options = new RequestOptions({ headers: headers });
   }
   getProducts(url: string, userState: any): any {

    return this.http.post(url, userState, this.options)
      .map((response: Response) => response.json());
  }
}