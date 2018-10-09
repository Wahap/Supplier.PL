import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs';

@Injectable()
export class VendorBillService {

  options: any;
  constructor(private http: Http) {
    let token = localStorage.getItem('userToken');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', token)
    this.options = new RequestOptions({ headers: headers });

  }

  getVendorBillProducts(url: string, input: any): any {
    return this.http.post(url, input, this.options)
      .map((response: Response) => response.json());
  }

  saveVendorBill(url: string, input: any): any {
    return this.http.post(url, input, this.options)
      .map((response: Response) => response.json());
  }

  getAllVendorBills(url: string, input: any): any {
    return this.http.post(url, input, this.options)
      .map((response: Response) => response.json());
  }

  deleteVendorBill(url: string, input: any): any {
    return this.http.post(url, input, this.options)
      .map((response: Response) => response.json());
  }

  filterVendorBills(url: string, input: any): any {
    return this.http.post(url, input, this.options)
      .map((response: Response) => response.json());
  }

  getThisWeekVendorBills(url: string, input: any): any {
    return this.http.post(url, input, this.options)
      .map((response: Response) => response.json());
  }

  getThisMonthVendorBills(url: string, input: any): any {
    return this.http.post(url, input, this.options)
      .map((response: Response) => response.json());
  }

}
