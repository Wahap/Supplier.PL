import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { BillService } from '../bill.service';
import { ConfigService, IConfig } from '../../../app.config';

@Component({
  selector: 'app-monthly-bill-report',
  templateUrl: './monthly-bill-report.component.html',
  styleUrls: ['./monthly-bill-report.component.scss']
})
export class MonthlyBillReportComponent implements OnInit {
 config:IConfig;
 chartType='bar';
 data:any;
 labels=['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
 dataSets:any[]=[];
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private billService: BillService,private configService: ConfigService) 
  {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.config=this.configService.getAppConfig();
    this.billService.getMonthlyBillReport(this.config.getMonthlyBillReportUrl).subscribe(report=>{
      console.log(report);
      let colors=['#006266','#1B1464','#6F1E51','#2f3542'];
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
      this.toastr.error("Aylık Rapor Getirilirken Hata Meydana Geldi");
    });

  }

  changeChartType(type)
  {
    if(this.chartType!=type)
    {
      this.chartType=type;
      this.data = {
        labels: this.labels,
        datasets: this.dataSets
        
    }
    }
    

   
  }

}
