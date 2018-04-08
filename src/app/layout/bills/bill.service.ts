import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Bill } from "../../shared/DTOs/Bill";

@Injectable()
export class BillService {
    options: any;
    constructor(private http: Http) {
        let token = localStorage.getItem('userToken');
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', token)
        this.options = new RequestOptions({ headers: headers });

    }

    getLastBill(url: string, input: any): any {
        return this.http.post(url, input, this.options)
            .map((response: Response) => response.json());
    }
    saveProductPrice(url: string, input: any): any {
        return this.http.post(url, input, this.options)
            .map((response: Response) => response.json());
    }

    getBill(url: string, input: any): any {
        return this.http.post(url, input, this.options)
            .map((response: Response) => response.json());
    }
    getAllBills(url: string, input: any): any {
        return this.http.post(url, input, this.options)
            .map((response: Response) => response.json());
    }
    saveBill(url: string, input: any): any {
        return this.http.post(url, input, this.options)
            .map((response: Response) => response.json());
    }

    deleteBill(url: string, input: any): any {
        return this.http.post(url, input, this.options)
            .map((response: Response) => response.json());
    }
}