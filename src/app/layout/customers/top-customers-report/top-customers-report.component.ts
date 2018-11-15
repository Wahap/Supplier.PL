import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { IConfig, ConfigService } from '../../../app.config';
import { ToastsManager } from 'ng2-toastr';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-top-customers-report',
  templateUrl: './top-customers-report.component.html',
  styleUrls: ['./top-customers-report.component.scss']
})
export class TopCustomersReportComponent implements OnInit {
  config:IConfig;
  chartType='bar';
  data:any;
  labels=[];
  reportData=[];
  dataSets:any[]=[];
  options: any;
  loading:boolean=false;
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private customerService: CustomersService,private configService: ConfigService) 
  {
    this.toastr.setRootViewContainerRef(vcr);
   }
   ngOnInit() {
     
    this.config=this.configService.getAppConfig();
    this.getTopCustomersByTotals();
    this.options = {
      title: {
          display: true,
          text: 'En iyi 20 Müşteri',
          fontSize: 16
      },
      legend: {
          position: 'top'
      }
  };
  

  }
getTopCustomersByTotals()
{
  this.loading=true;
  this.labels=[];
  this.reportData=[];
  this.customerService.getTopCustomers(this.config.getTopCustomersUrl,null).subscribe(report=>{

    this.loading=false;
    report.forEach(total => {
      this.labels.push(total.label);
      this.reportData.push(total.grossPrice);
    });

    this.data = {
      labels: this.labels,
      datasets: [
          {
              label: 'Toplam Satış(€)',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data:this.reportData
          }
      ]
  }
  },error=>{
    this.toastr.error("Rapor Getirilirken Hata Meydana Geldi");
  });
}
  getTopCustomersByYear()
  {
    this.loading=true;
    this.labels=[];
    this.customerService.getTopCustomersByYear(this.config.getTopCustomersByYearUrl,null).subscribe(report=>{
      console.log(report);
      this.loading=false;
      let colors=['#6F1E51','#1B1464','#6F1E51','#2f3542'];
      this.labels=report[0].labels;
      let counter=-1;
      this.dataSets=report.map(item=>{
        counter++;
        return {
          label:item.label,
          data:item.data,
          backgroundColor: colors[counter],
          borderColor: colors[counter],
          fill:true
        };
      });
      this.data = {
        labels: this.labels,
        datasets: this.dataSets
        
    }

    },error=>{
      this.toastr.error("Rapor Getirilirken Hata Meydana Geldi");
    });
  }

}
