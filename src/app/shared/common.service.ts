import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';

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

  saveBrand(url: string, units: any): any {
    return this.http.post(url, units, this.options)
      .map((response: Response) => response.json());
  }
  saveCategory(url: string, units: any): any {
    return this.http.post(url, units, this.options)
      .map((response: Response) => response.json());
  }
  saveSupplier(url: string, units: any): any {
    return this.http.post(url, units, this.options)
      .map((response: Response) => response.json());
  }
  saveUnit(url: string, units: any): any {
    return this.http.post(url, units, this.options)
      .map((response: Response) => response.json());
  }

  getIpAddress(url: string): any {
    return this.http.get(url)
      .map((response: Response) => response.json());
  }

  getDashBoardData(url: string,parameters:any): any {
    return this.http.post(url,parameters, this.options)
      .map((response: Response) => response.json());
  }

  createLog(url: string, units: any): any {
    return this.http.post(url, units, this.options)
      .map((response: Response) => response.json());
  }

  getAllPaymentTypes(url: string, units: any): any {
    return this.http.post(url, units, this.options)
      .map((response: Response) => response.json());
  }

  getAllDiscountRates(url: string, input: any): any {
    return this.http.post(url, input, this.options)
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
  getCities(url: string, supplier: any): any {
    return this.http.post(url, supplier, this.options)
      .map((response: Response) => response.json());
  }

  saveCity(url: string, city: any): any {
    return this.http.post(url, city, this.options)
      .map((response: Response) => response.json());
  }

}
