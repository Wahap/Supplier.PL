
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
 
  saveOrder(url: string, input: any): any {
    return this.http.post(url, input, this.options)
      .map((response: Response) => response.json());
  }

  deleteOrder(url: string, input: any): any {
    return this.http.post(url, input, this.options)
      .map((response: Response) => response.json());
  }

  convertOrderToWaybill(url: string, input: any): any {
    return this.http.post(url, input, this.options)
      .map((response: Response) => response.json());
  }

  getReceivedOrderProducts(url: string, input: any): any {
    return this.http.post(url, input, this.options)
      .map((response: Response) => response.json());
  }

  
  getAllReceivedOrders(url: string, input: any): any {
    return this.http.post(url, input, this.options)
      .map((response: Response) => response.json());
  }
  getAllOrderDetails(url: string, input: any): any {
    return this.http.post(url, input, this.options)
      .map((response: Response) => response.json());
  }

  getThisWeekOrders(url: string, input: any): any {
    return this.http.post(url, input, this.options)
        .map((response: Response) => response.json());
}

getThisMonthOrders(url: string, input: any): any {
    return this.http.post(url, input, this.options)
        .map((response: Response) => response.json());
}


filterOrders(url: string, input: any): any {
    return this.http.post(url, input, this.options)
        .map((response: Response) => response.json());
}


}
