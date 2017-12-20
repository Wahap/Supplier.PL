import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginServiceService {
  name: string;

  constructor(private http: Http) {

  } 

  login(url: string, userState: any): any {
 
    return this.http.post(url, userState)
      .map(this.extractDetailData);
  }
  setGreetingMessage(name) {
    this.name = name;
  }
  getGreetingMessage() {
    return this.name;
  }

  private extractDetailData(res: Response) {
    let body = res.json();
    console.log("asd"+body)
    return body || [];
  }
}
