import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginServiceService {
  name: string;

  constructor(private http: Http) {

  } 

  // login(url: string, userState: any): any {
 
  //   return this.http.post(url, userState)
  //     .map(this.extractDetailData);
  // }
  login(url: string, input: any): any {
    return this.http.post(url, input)
      .map((response: Response) => response.json());
  }
 
}
