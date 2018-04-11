import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class BlankPageService {
  options: any;
  constructor(private http: Http) {
    let token = localStorage.getItem('userToken');
    //   let headers = new Headers({ 'Authorization','token' });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', token)
    this.options = new RequestOptions({ headers: headers });



  }

    upload(url: any,fileToUpload: any) {
      let input = new FormData();
      input.append("file", fileToUpload);
      return this.http
          .post(url, input);
  }
  getProducts(url: string, userState: any): any {

    return this.http.post(url, userState, this.options)
      .map((response: Response) => response.json());
  }

}
