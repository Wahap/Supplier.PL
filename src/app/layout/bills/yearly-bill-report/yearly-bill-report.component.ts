import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { BillService } from '../bill.service';
import { ConfigService, IConfig } from '../../../app.config';

@Component({
  selector: 'app-yearly-bill-report',
  templateUrl: './yearly-bill-report.component.html',
  styleUrls: ['./yearly-bill-report.component.scss']
})
export class YearlyBillReportComponent implements OnInit {
 config:IConfig;
 data:any;
 labels=[];
 reportData=[];
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private billService: BillService,private configService: ConfigService) 
  {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.config=this.configService.getAppConfig();
    this.billService.getYearlyBillReport(this.config.getYearlyBillReportUrl).subscribe(report=>{
      console.log(report);
    
      report.forEach(total => {
        this.labels.push(total.year);
        this.reportData.push(total.grossPrice);
      });

      this.data = {
        labels: this.labels,
        datasets: [
            {
                label: 'Yıllık Satış (€)',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data:this.reportData
            }
        ]
    }
    },error=>{
      this.toastr.error("Yıllık Rapor Getirilirken Hata Meydana Geldi");
    })
    
  }

}
