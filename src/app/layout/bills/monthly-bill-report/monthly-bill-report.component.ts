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
 data:any;
 labels=['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private billService: BillService,private configService: ConfigService) 
  {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.config=this.configService.getAppConfig();
    this.billService.getMonthlyBillReport(this.config.getMonthlyBillReportUrl,null).subscribe(report=>{
      console.log(report);
      let colors=['#006266','#1B1464','#6F1E51'];
      let counter=-1;
      let dataSets=report.map(item=>{
        counter++;
        return {
          label:item.label,
          data:item.data,
          backgroundColor: colors[counter],
          borderColor: '#1E88E5',
        };
      });
      this.data = {
        labels: this.labels,
        datasets: dataSets
        
    }
    },error=>{
      this.toastr.error("Aylık Rapor Getirilirken Hata Meydana Geldi");
    });

  }

}
