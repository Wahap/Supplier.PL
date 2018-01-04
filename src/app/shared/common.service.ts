import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { cachingDictionary } from './DTOs/cachingData';

@Injectable()
export class CommonService {
  options: any;
  cachingServices:any[];
  constructor(private http: Http) {
    let token = localStorage.getItem('userToken');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', token)
    this.options = new RequestOptions({ headers: headers });

    // this.cachingServices =[];
    // this.cachingServices['getCategories']="";
  }
  getCategories(url: string, categories: any): any {
    
    // if (this.cachingServices['getCategories'] != "") {
    //  return this.cachingServices['getCategories'];
    // } else {
      return this.http.post(url, categories, this.options)
        .map(this.extractData);
     
    //}
  }
  // getdata(funcName) {
  //   return this.cachingServices[funcName];
  // }
  // setdata(funcName,value) {
  //   this.cachingServices[funcName] = value;
  // }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
}
  getAllUnits(url: string, units: any): any {
    return this.http.post(url, units, this.options)
      .map((response: Response) => response.json());
  }
  getAllBrands(url: string, brands: any): any {
    return this.http.post(url, brands, this.options)
      .map((response: Response) => response.json());
  }
  getAllCities(url: string, cities: any): any {
    return this.http.post(url, cities, this.options)
      .map((response: Response) => response.json());
  }
  getSuppliers(url: string, supplier: any): any {
    return this.http.post(url, supplier, this.options)
      .map((response: Response) => response.json());
  }

}
