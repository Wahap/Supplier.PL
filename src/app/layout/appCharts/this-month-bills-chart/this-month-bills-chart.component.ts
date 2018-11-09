import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-this-month-bills-chart',
  templateUrl: './this-month-bills-chart.component.html',
  styleUrls: ['./this-month-bills-chart.component.scss']
})
export class ThisMonthBillsChartComponent implements OnInit {
  @Input() thisMonthBillsData: any;

  data:any;
  constructor(public route:Router) { }


  ngOnInit() {
  }

  ngOnChanges() {

    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.data = {
      labels: ['Net Satış','KDV','Brüt','Alış'],
      datasets: [
        {
            label: 'Euro',
            backgroundColor: '#42A5F5',
            borderColor: '#fff',
            data: this.thisMonthBillsData
        }]
    };
  }

  onChartClick(event)
  {
    this.route.navigateByUrl("thisMonthBills");
  }

}
