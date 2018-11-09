import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unpaid-bills-chart',
  templateUrl: './unpaid-bills-chart.component.html',
  styleUrls: ['./unpaid-bills-chart.component.scss']
})
export class UnpaidBillsChartComponent implements OnInit {
  @Input() unPaidBillsData: any;

  data:any;
  constructor(public route:Router) { }

  ngOnInit() {


  }

  ngOnChanges() {

    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.data = {
      labels: ['Ödenmeyen Faturalar('+this.unPaidBillsData[0]+')', 'Son Ödemesi Geçmiş Faturalar('+this.unPaidBillsData[1]+')'],
      datasets: [
        {
          data: this.unPaidBillsData,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
    };
  }

  onChartClick(event)
  {
    let indis=event.element._index;
    if(indis==0){
      this.route.navigateByUrl("unpaidBills");
    }
    else if(indis==1){
      this.route.navigateByUrl("overDueBills");
    }
  }



}
