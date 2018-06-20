import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CustomersService {
  options: any;
  constructor(private http: Http) {
    let token = localStorage.getItem('userToken');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', token)
    this.options = new RequestOptions({ headers: headers });
   }

   getCustomers(url: string, input: any): any {
    return this.http.post(url, input, this.options)
      .map((response: Response) => response.json());
  }
  getCustomerPrices(url: string, input: any): any {
    return this.http.post(url, input, this.options)
      .map((response: Response) => response.json());
  }
  saveCustomer(url: string, input: any): any {
    return this.http.post(url, input, this.options)
      .map((response: Response) => response.json());
  }

  saveCustomerProductPrice(url: string, input: any): any {
    return this.http.post(url, input, this.options)
      .map((response: Response) => response.json());
  }


getCities(url: string, input: any): any {
  return this.http.post(url, input, this.options)
    .map((response: Response) => response.json());
}
 //#endregion
}
