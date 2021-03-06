import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../shared/DTOs/product';

@Injectable()
export class ProductsService {
  options: any;
  constructor(private http: Http) {
    let token = localStorage.getItem('userToken');
    let headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Authorization', token)
    this.options = new RequestOptions({ headers: headers });
   }
   getProducts(url: string, input: any): any {
    return this.http.post(url, input, this.options)
      .map((response: Response) => response.json());
  }
  
  getTopProducts(url: string): any {
    return this.http.get(url)
      .map((response: Response) => response.json());
  }

  getTopProductsByYear(url: string): any {
    return this.http.get(url,  this.options)
      .map((response: Response) => response.json());
  }

  getPassiveProducts(url: string, input: any): any {
    return this.http.post(url, input, this.options)
      .map((response: Response) => response.json());
  }
  saveProducts(url: string, input: any): any {
    return this.http.post(url, input, this.options)
      .map((response: Response) => response.json());
  }
  upload(url: any,fileToUpload: any) {
    let input = new FormData();
    input.append("file", fileToUpload);
    return this.http
        .post(url, input);
}

getGroupPrices(url: string, input: any): any {
  return this.http.post(url, input, this.options)
    .map((response: Response) => response.json());
}
getAllGroupPrices(url: string, input: any): any {
  return this.http.post(url, input, this.options)
    .map((response: Response) => response.json());
}

saveProductGroupPrices(url: string, input: any): any {
  return this.http.post(url, input, this.options)
    .map((response: Response) => response.json());
}
}
