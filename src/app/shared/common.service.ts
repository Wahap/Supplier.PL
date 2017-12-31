import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommonService {
  options: any;
  constructor(private http: Http) {
    let token = localStorage.getItem('userToken');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', token)
    this.options = new RequestOptions({ headers: headers });
   }
   getCategories(url: string, categories: any): any {
    return this.http.post(url, categories, this.options)
      .map((response: Response) => response.json());
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

}
