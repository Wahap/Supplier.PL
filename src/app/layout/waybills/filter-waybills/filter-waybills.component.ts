import { Component, OnInit } from '@angular/core';
import { Waybill } from '../../../shared/DTOs/wayBill';

@Component({
  selector: 'app-filter-waybills',
  templateUrl: './filter-waybills.component.html',
  styleUrls: ['./filter-waybills.component.scss']
})
export class FilterWaybillsComponent implements OnInit {
filteredWaybills:Waybill[]=[];
  constructor() { }

  ngOnInit() {
  }

}
