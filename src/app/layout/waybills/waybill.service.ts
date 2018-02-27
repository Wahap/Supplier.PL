import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Waybill } from "../../shared/DTOs/wayBill";

@Injectable()
export class WaybillService {
    options: any;
    constructor(private http: Http) {
        let token = localStorage.getItem('userToken');
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', token)
        this.options = new RequestOptions({ headers: headers });

    }

    getLastWaybill(url: string, input: any): any {
        return this.http.post(url, input, this.options)
            .map((response: Response) => response.json());
    }

    getWaybill(url: string, input: any): any {
        return this.http.post(url, input, this.options)
            .map((response: Response) => response.json());
    }
    getAllWaybills(url: string, input: any): any {
        return this.http.post(url, input, this.options)
            .map((response: Response) => response.json());
    }
    saveWaybill(url: string, input: any): any {
        return this.http.post(url, input, this.options)
            .map((response: Response) => response.json());
    }

    deleteWaybill(url: string, input: any): any {
        return this.http.post(url, input, this.options)
            .map((response: Response) => response.json());
    }
}