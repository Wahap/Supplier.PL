import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { IConfig, ConfigService } from '../../../app.config';
import { ToastsManager } from 'ng2-toastr';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-top-products-report',
  templateUrl: './top-products-report.component.html',
  styleUrls: ['./top-products-report.component.scss']
})
export class TopProductsReportComponent implements OnInit {

  config:IConfig;
  chartType='bar';
  data:any;
  labels=[];
  reportData1=[];
  reportData2=[];
  dataSets:any[]=[];
  options: any;
  loading:boolean=false;
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private productService: ProductsService,private configService: ConfigService) 
  {
    this.toastr.setRootViewContainerRef(vcr);
   }
   ngOnInit() {
     
    this.config=this.configService.getAppConfig();
   
    this.options = {
      title: {
          display: true,
          text: 'En Çok Satan 20 Ürün',
          fontSize: 16
      },
      legend: {
          position: 'top'
      }
  };
  

  }
getTopProductsByTotals(orderBy:string="price")
{
  this.loading=true;
  this.labels=[];
  this.reportData1=[];
  this.reportData2=[];
  this.productService.getTopProducts(this.config.getTopProductsUrl+"?orderBy="+orderBy).subscribe(report=>{
console.log(report);
    this.loading=false;
    report.forEach(total => {
      this.labels.push(total.label);
      this.reportData1.push(total.grossPrice);
      this.reportData2.push(total.totalPackages);
    });

    this.data = {
      labels: this.labels,
      datasets: [
          {
              label: 'Toplam Satış(€)',
              backgroundColor: '#83186c',
              borderColor: '#1E88E5',
              data:this.reportData1
          },
          {
            label: 'Toplam Koli',
            backgroundColor: '#343091',
            borderColor: '#1E88E5',
            data:this.reportData2
        }
      ]
  }
  },error=>{
    this.toastr.error("Rapor Getirilirken Hata Meydana Geldi");
  });
}
  getTopProductsByYear(orderBy:string="price")
  {
    this.loading=true; 
    this.labels=[];
    this.productService.getTopProductsByYear(this.config.getTopProductsByYearUrl+"?orderBy="+orderBy,).subscribe(report=>{
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
