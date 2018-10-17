import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs';

@Injectable()
export class ReturnBillService {

  options: any;
  constructor(private http: Http) {
    let token = localStorage.getItem('userToken');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', token)
    this.options = new RequestOptions({ headers: headers });

  }

  getNextReturnBillNumber(url: string, input: any): any {//Returns maxBillNumber+1
    return this.http.post(url, input, this.options)
      .map((response: Response) => response.json());
  }

  getAllReturnBills(url: string, input: any): any {//Returns maxBillNumber+1
    return this.http.post(url, input, this.options)
      .map((response: Response) => response.json());
  }

  saveReturnBill(url: string, input: any): any {//Returns maxBillNumber+1
    return this.http.post(url, input, this.options)
      .map((response: Response) => response.json());
  }

  deleteReturnBill(url: string, input: any): any {//Returns maxBillNumber+1
    return this.http.post(url, input, this.options)
      .map((response: Response) => response.json());
  }

  getThisWeekReturnBills(url: string, input: any): any {//Returns maxBillNumber+1
    return this.http.post(url, input, this.options)
      .map((response: Response) => response.json());
  }

  getThisMonthReturnBills(url: string, input: any): any {//Returns maxBillNumber+1
    return this.http.post(url, input, this.options)
      .map((response: Response) => response.json());
  }

  getReturnBillProducts(url: string, input: any): any {//Returns maxBillNumber+1
    return this.http.post(url, input, this.options)
      .map((response: Response) => response.json());
  }

  filterReturnBills(url: string, input: any): any {//Returns maxBillNumber+1
    return this.http.post(url, input, this.options)
      .map((response: Response) => response.json());
  }

  getReturnBillPayments(url: string, input: any): any {//Returns maxBillNumber+1
    return this.http.post(url, input, this.options)
      .map((response: Response) => response.json());
  }

  savePayment(url: string, input: any): any {//Returns maxBillNumber+1
    return this.http.post(url, input, this.options)
        .map((response: Response) => response.json());
}

deletePayment(url: string, input: any): any {//Returns maxBillNumber+1
  return this.http.post(url, input, this.options)
      .map((response: Response) => response.json());
}

}
