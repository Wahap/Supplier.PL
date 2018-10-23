import { Component, OnInit } from '@angular/core';
import { BillService } from '../bills/bill.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  numberOfUnpaidBills:number;
  constructor(private billService:BillService) {
   
  }

  ngOnInit() {
  }

  getNumberOfUnpaidBills()
  {

  }

}
